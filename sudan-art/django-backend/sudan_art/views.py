from rest_framework import viewsets
from .serializers import ArtworkSerializer
from .models import Artwork
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, viewsets, generics, filters, serializers, fields
import logging

logger = logging.getLogger(__name__)
# Create your views here.


class ValidateQueryParams(serializers.Serializer):
    search = fields.RegexField('^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$',)
    artist = fields.RegexField('^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$', required=False)
    date_from = fields.DateField(format='%Y%m%d', required=False)
    date_to = fields.DateField(format='%Y%m%d', required=False)
    random = fields.BooleanField()


class ArtworkList(generics.ListAPIView):
    search_fields = ['artist', 'tags', 'date_uploaded']
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        query_params = ValidateQueryParams(data=self.request.query_params)
        query_params.is_valid(raise_exception=True)
        query_dict = {k: v for k, v in self.request.query_params.items() if v}
        if set(query_dict.keys()) == {'search'}:
            queryset = Artwork.objects.all()
            return queryset
        else:
            filter_keyword_arguments_dict = {}
            for key, value in query_dict.items():
                if key == 'artist':
                    filter_keyword_arguments_dict['artist__icontains'] = value
                if key == 'date_from':
                    filter_keyword_arguments_dict['date_uploaded__gte'] = value
                if key == 'date_to':
                    filter_keyword_arguments_dict['date_uploaded__lte'] = value
            queryset = Artwork.objects.filter(**filter_keyword_arguments_dict)
            return queryset


@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
def add_artwork(request):
    artwork_serialized = ArtworkSerializer(data=request.data)
    if artwork_serialized.is_valid():
        artwork_serialized.save()
        return Response(artwork_serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(artwork_serialized.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def recent_artwork(request):
    queryset = Artwork.objects.order_by("-date_uploaded")[:20]
    serializer = ArtworkSerializer(queryset, many=True)
    return Response(serializer.data)