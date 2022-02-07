import React, { useState } from "react";
import NavBar from "../Navbar/navbar.js";
import Emoji from "../Emoji/emoji.js";
import {
  Button,
  Heading,
  Box,
  Container,
  Stack,
  SimpleGrid,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import SearchForm from "./searchForm.js";
import ImagePopover from "../ImagePopover/imagePopover.js";
import { config } from "../../constants.js";
import ImageRenderer from "../ImageRenderer/imageRenderer.js";

/**
 * Main search component.
 */
export default function Search() {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popoverImageDetails, setPopoverImageDetails] = useState({
    imageSrc: "",
    imageDescription: "",
    imageArtist: "",
    imageDate: "",
    imageHighRes: "",
  });

  const getMaPics = async (query) => {
    setQuery(query);
    setSubmit(true);
    setLoading(true);
    let apiQueryParameters = `search=${query.query}&page=${page}`;
    for (let [key, value] of Object.entries(query)) {
      if (value && key !== "query") {
        apiQueryParameters += `&${key}=${value}`;
      }
    }
    fetch(`${config.url}/api/artwork/?${apiQueryParameters}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // This bit adds more images on if there is more
        setPics((previousImages) => {
          return [...previousImages, ...response.results];
        });
        // Then handle a boolean state to track if there is indeed more below + relevant pagination
        if (response.next) {
          setHasMore(true);
          setPage((prevPageNumber) => prevPageNumber + 1);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <NavBar />
      <br />
      <div className="search-container">
        <Box position={"relative"}>
          <Container as={SimpleGrid} maxW={"7xl"}>
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4}>
                <FormLabel className="search-form-label">
                  <Heading color="gray.800">Find revolutionary art</Heading>
                </FormLabel>
                <br />

                <SearchForm
                  handleSubmit={getMaPics}
                  setQuery={setQuery}
                  setPics={setPics}
                />
              </Stack>
            </Stack>
          </Container>
        </Box>
      </div>
      {loading && submitted && (
        <div className="search-container">
          <div id="search-spinning-emoji">
            <Emoji symbol="🇸🇩" fontSize="30px" />
          </div>
        </div>
      )}
      {submitted && (
        <div className="search-container">
          <div className="search-results" aria-label="search-results">
            {pics.map((pic, index) => {
              return (
                <div key={`search-image-container ${index}`}>
                  <ImageRenderer
                    className="search-image"
                    alt={pic.artist}
                    src={pic.thumbnail}
                    onClick={() => {
                      setPopoverImageDetails({
                        imageSrc: pic.thumbnail,
                        imageDescription: pic.tags,
                        imageArtist: pic.artist,
                        imageDate: pic.date_uploaded,
                        imageHighRes: pic.high_res_image,
                      });
                      onOpen(true);
                    }}
                    aria-label="search result image"
                  />
                </div>
              );
            })}
            <ImagePopover
              isOpen={isOpen}
              onClose={onClose}
              popoverImageDetails={popoverImageDetails}
            />
          </div>
        </div>
      )}

      {!loading && hasMore && submitted && (
        <>
          <div className="search-container">
            <Button
              height="48px"
              width="200px"
              id="search-button"
              onClick={() => getMaPics(query)}
            >
              Load more
            </Button>
          </div>
        </>
      )}
      {!loading && submitted && pics.length === 0 && (
        <>
          <div className="search-container">
            <Heading as="h4" size="md" className="search-no-results-text">
              There were no results for this search. Please try again.
            </Heading>
          </div>
        </>
      )}
    </>
  );
}
