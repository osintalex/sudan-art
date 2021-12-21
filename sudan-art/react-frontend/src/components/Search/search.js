import React, { useState} from "react";
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
import placeholder from "../Navbar/eye_logo.png";
import ImagePopover from "./imagePopover.js";

export default function Search() {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popoverImageDetails, setPopoverImageDetails] = useState({
    src: "",
    alt: "",
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
    fetch(`http://157.245.47.223:8000/api/artwork/?${apiQueryParameters}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response)
        // todo this works but I don't understand why, ask someone
        setPics((previousImages) => {
          return [...previousImages, ...response.results];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        if (response.next) {
          setHasMore(true);
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
                  <Heading color="gray.800">Find revolutionary art </Heading>
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
          <div className="search-results">
            {pics.map((pic, index) => {
              return (
                <img
                  className="search-image"
                  alt={pic.artist}
                  key={`image ${pic.tags} ${index}`}
                  // onLoad={(e) => (e.target.src = pic.image)}
                  // onError={(e) => {
                  //   e.target.onerror = null;
                  // }}
                  // src={placeholder}
                  src={pic.image}
                  onClick={() => {
                    setPopoverImageDetails({
                      src: pic.image,
                      alt: pic.alt_description,
                      artist: pic.artist,
                      date: pic.date_uploaded
                    });
                    onOpen(true);
                  }}
                />
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
