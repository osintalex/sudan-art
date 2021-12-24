import React, { useState, useEffect, useRef } from "react";
import { Button, Center, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Emoji from "../Emoji/emoji.js";
import { config } from "../../constants.js"

export default function LandingPage() {
  const navigate = useNavigate();
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  useEffect(() => {
    fetch(`${config.url}/recent/`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setPics(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function handleClick() {
    navigate("/mrhaba");
  }
  const handleOnLoad = () => {
    counter.current += 1;
    if (counter.current >= 20) {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <div id="spinning-emoji">
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
          {pics.map((pic, index) => {
            return (
              <div className="masonry-item" key={`div ${pic.tags} ${index}`}>
                <img
                  className="landing-image"
                  alt={pic.artist}
                  key={`image ${pic.tags} ${index}`}
                  src={pic.image}
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
