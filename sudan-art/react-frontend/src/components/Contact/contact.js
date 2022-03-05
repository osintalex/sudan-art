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
import protestImage from "./protest.png";
import NavBar from "../Navbar/navbar.js";
import MultiLingualContent from "../MultingualContent/multilingualContent";

// Based off https://chakra-templates.dev/page-sections/hero CTA with Illustration
/**
 * Main contact component
 * @return {component} Contact component.
 */
const Contact = () => {
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
                src={protestImage}
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading as="h4" size="md" className="contact-text">
              {<MultiLingualContent contentID="contact_1" />}
              <br />
              <Link
                href="mailto:sudanart2022@gmail.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                sudanart2022@gmail.com
              </Link>
              <br />
              <br />
              {<MultiLingualContent contentID="contact_2" />}
              <br />
              <Link
                href="https://www.github.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                {<MultiLingualContent contentID="contact_code" />}
              </Link>
              <br />
              <br />
              {<MultiLingualContent contentID="contact_3" />}
              <br />
              <Link
                href="https://www.sudancoup.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                sudancoup.com
              </Link>
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
export default Contact;
