import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import exampleImage from "./example.jpeg";
import NavBar from "../Navbar/navbar.js";

// Based off https://chakra-templates.dev/page-sections/hero CTA with Illustration
/**
 * Introduction component
 * @return {component} introduction component
 */
const Introduction = () => {
  return (
    <>
      <NavBar />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              boxShadow={"2xl"}
              width={"full"}
            >
              <Image
                className="introduction-image"
                alt="protesting woman stands on car"
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={exampleImage}
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading as="h4" size="md" className="contact-text">
              This site is a digital home for Sudanese revolutionary art. <br />
              <br />
              It is heavily inspired by the Burmese website{" "}
              <Link
                href="https://www.threefingers.org"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                threefingers.org
              </Link>{" "}
              which began hosting revolutionary art in response to the coup in
              Myanmar. <br />
              <br />
              You can explore all art on the site{" "}
              <Link
                as={ReactRouterLink}
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
                to="/search"
              >
                here.
              </Link>{" "}
              You can also{" "}
              <Link
                as={ReactRouterLink}
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
                to="/upload"
              >
                upload
              </Link>{" "}
              your own art.
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
export default Introduction;
