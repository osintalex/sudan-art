import React from "react";
import {
  Heading,
  Box,
  Link,
  Container,
  Stack,
  Flex,
  Image,
} from "@chakra-ui/react";
import NavBar from "../Navbar/navbar.js";
import protestImage from "./protest.png";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";
// Based off https://chakra-templates.dev/page-sections/hero CTA with Illustration
/**
 * Main contact component
 */
const Contact = () => {
  return (
    <>
      <NavBar />
      <MultiLingualContent contentID="hello" />
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
              You can email us at{" "}
              <Link
                href="mailto:info@sudanart.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                info@sudanart.com.
              </Link>
              <br />
              <br />
              If you're a developer, the code for this project is open source!
              Please check out our github repository and consider contributing{" "}
              <Link
                href="https://www.github.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                here.
              </Link>
              <br />
              <br />
              You should also check out our fantastic sister site{" "}
              <Link
                href="https://www.sudancoup.com"
                target="_blank"
                bgGradient="linear(to-r,orange.400, yellow.400)"
                bgClip="text"
              >
                sudancoup.com
              </Link>
              .
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
export default Contact;
