import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../../constants.js";
import Emoji from "../Emoji/emoji.js";
import ImagePopover from "../ImagePopover/imagePopover.js";
import ImageRenderer from "../ImageRenderer/imageRenderer.js";
import NavBar from "../Navbar/navbar.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";

/**
 * Browse component.
 * @return {component} the browse component.
 */
export default function Browse() {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popoverImageDetails, setPopoverImageDetails] = useState({
    imageSrc: "",
    imageDescription: "",
    imageArtist: "",
    imageDate: "",
    imageHighRes: "",
  });
  const getMaPics = useCallback(async (page) => {
    setLoading(true);
    fetch(`${config.url}/recent/?page=${page}`)
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
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    getMaPics(page);
  }, [getMaPics, page]);

  return (
    <>
      <NavBar />
      <br />
      <div className="search-container">
        <Box position={"relative"}>
          <Heading>{<MultiLingualContent contentID="browse_1" />}</Heading>
        </Box>
      </div>
      {loading && (
        <div className="search-container">
          <div id="search-spinning-emoji">
            <Emoji symbol="🇸🇩" fontSize="30px" />
          </div>
        </div>
      )}
      <div className="search-container">
        <div className="search-results" aria-label="search-results">
          {pics.map((pic, index) => {
            return (
              <div key={`search-image-container ${index}`}>
                <ImageRenderer
                  className="search-image"
                  alt={pic.artist}
                  // The backend delivers media urls differently in development vs production
                  src={
                    process.env.NODE_ENV === "development"
                      ? `${config.url}${pic.thumbnail}`
                      : pic.thumbnail
                  }
                  onClick={() => {
                    setPopoverImageDetails({
                      imageSrc: `${pic.thumbnail}`,
                      imageDescription: pic.tags,
                      imageArtist: pic.artist,
                      imageDate: pic.date_uploaded,
                      imageHighRes: `${pic.high_res_image}`,
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

      {!loading && hasMore && (
        <>
          <div className="search-container">
            <Button
              height="48px"
              width="200px"
              id="search-button"
              onClick={() => setPage((prevPageNumber) => prevPageNumber + 1)}
              aria-label="has-more-button"
            >
              Load more
            </Button>
          </div>
        </>
      )}
    </>
  );
}
