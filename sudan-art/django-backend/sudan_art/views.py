from .serializers import ArtworkSerializer
from .models import Artwork
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, viewsets, generics, filters, serializers, fields
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class ValidateQueryParams(serializers.Serializer):
    search = fields.RegexField(
        "^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$",
    )
    artist = fields.RegexField(
        "^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$", required=False
    )
    date_from = fields.DateField(format="%Y%m%d", required=False)
    date_to = fields.DateField(format="%Y%m%d", required=False)


class ArtworkList(generics.ListAPIView):
    search_fields = ["artist", "tags", "date_uploaded"]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        """
        Searches the database in relation to the query sent by the user.
        :return: Django queryset object containing search results.
        """
        query_params = ValidateQueryParams(data=self.request.query_params)
        query_params.is_valid(raise_exception=True)
        query_dict = {k: v for k, v in self.request.query_params.items() if v}
        filter_keyword_arguments_dict = {}
        for key, value in query_dict.items():
            if key == "artist":
                filter_keyword_arguments_dict["artist__icontains"] = value
            if key == "date_from":
                filter_keyword_arguments_dict["date_uploaded__gte"] = value
            if key == "date_to":
                filter_keyword_arguments_dict["date_uploaded__lte"] = value
        queryset = Artwork.objects.filter(**filter_keyword_arguments_dict)
        return queryset


@api_view(["POST"])
@parser_classes([FormParser, MultiPartParser])
def add_artwork(request):
    """
    Image upload view.
    :param request: user request instance.
    :return: Rest Framework Response, 201 if uploaded OK and 400 with error messages.
    """
    request.data['thumbnail'] = request.data['image']
    request.data['high_res_image'] = request.data['image']
    artwork_serialized = ArtworkSerializer(data=request.data)
    if artwork_serialized.is_valid():
        artwork_serialized.save()
    # artwork_serialized = ArtworkUpload(data=request.data)
    # if artwork_serialized.is_valid():
    #     new_artwork = Artwork(artist=artwork_serialized.data['artist'],
    #                           tags=artwork_serialized.data['tags'],
    #                           thumbnail=artwork_serialized.data['image'],
    #                           high_res_image=artwork_serialized.data['image'])
    #     logger.info(new_artwork.thumbnail.name)
    #     logger.info(new_artwork.thumbnail.path)
    #     logger.info(new_artwork.thumbnail.url)
    #     new_artwork.save()
        return Response(artwork_serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(artwork_serialized.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def recent_artwork(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    artworks = Artwork.objects.order_by("-date_uploaded").all()
    result_page = paginator.paginate_queryset(artworks, request)
    serializer = ArtworkSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
