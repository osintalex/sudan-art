import React from "react";
import NavBar from "../Navbar/navbar.js";
import Emoji from "../Emoji/emoji.js";
import {
  Box,
  Heading,
  Container,
  Stack,
  Flex,
  Image,
  Link,
} from "@chakra-ui/react";
import notFoundImage from "./404.png";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Contact() {
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
              Oh no! There is nothing here.
              <br />
              <br />
              It seems this page is as empty as Burhan's heart.{" "}
              <Emoji symbol="😭" fontSize="23px" />
              <Emoji symbol="😭" fontSize="23px" />
              <Emoji symbol="😭" fontSize="23px" />
              <br />
              <br />
              Click{" "}
              <Link
                as={ReactRouterLink}
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
                to="/mrhaba"
              >
                here
              </Link>{" "}
              to go back to the about page.
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
