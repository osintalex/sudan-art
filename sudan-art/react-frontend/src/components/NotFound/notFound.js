import { Box, Container, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import React from "react";
import notFoundImage from "./404.png";
import Emoji from "../Emoji/emoji.js";
import NavBar from "../Navbar/navbar.js";
import MultiLingualContent from "../MultingualContent/multilingualContent";

/**
 * Not found component; routing for this handled in App.js
 * @return {component} not found component.
 */
export default function NotFound() {
  return (
    <>
      <NavBar />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box position={"relative"} height={"400px"} boxShadow={"2xl"}>
              <Image
                className="introduction-image"
                alt="protesting woman stands on car"
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={notFoundImage}
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading as="h4" size="md" className="contact-text">
              {<MultiLingualContent contentID="not_found_1" />}
              <br />
              <br />
              {<MultiLingualContent contentID="not_found_2" />}{" "}
              <Emoji symbol="😭" fontSize="23px" />
              <Emoji symbol="😭" fontSize="23px" />
              <Emoji symbol="😭" fontSize="23px" />
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
