import React, { useState, useRef, useEffect } from "react";
import { Button, Center, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Emoji from "../Emoji/emoji.js";
import { IMAGES } from "./landingImages.js";
/**
 * Main landing page component.
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  /**
   * Very simple click handler to go to the intro page on clicking the main enter button.
   */
  function handleClick() {
    navigate("/mrhaba");
  }
  /**
   * This blocks the page from rendering the images until at least 20 images have loaded since it looks crap
   * otherwise. Also avoids some ugly layout shifts.
   */
  const handleOnLoad = () => {
    counter.current += 1;
    if (counter.current >= 20) {
      setLoading(false);
    }
  };
  /**
   * This hook temporarliy blocks scrolling on this page, which makes the masonry layout look better.
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  });
  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <div id="spinning-emoji" aria-label="loading spinner">
          <Emoji symbol="🇸🇩" fontSize="30px" />
        </div>
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <Center className="landing-absolute-center">
          <Box>
            <Button
              height="48px"
              width="200px"
              onClick={handleClick}
              id="landing-button"
            >
              ENTER
            </Button>
          </Box>
        </Center>
        <div className="masonry">
          {IMAGES.map((pic, index) => {
            return (
              <div
                className="masonry-item"
                key={`div ${index}`}
                aria-label="revolutionary art image"
              >
                <img
                  className="landing-image"
                  alt="sudanese revolutionary art"
                  key={`image ${index}`}
                  src={pic}
                  onLoad={handleOnLoad}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
