import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import exampleImage from "./example.jpeg";
import NavBar from "../Navbar/navbar.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";
import { LanguageContext } from "../../multilingualContext/context.js";

// Based off https://chakra-templates.dev/page-sections/hero CTA with Illustration
/**
 * Introduction component
 * @return {component} introduction component
 */
const Introduction = () => {
  const { language } = useContext(LanguageContext);
  if (language == "english") {
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
                {<MultiLingualContent contentID="intro_1" />} <br />
                <br />
                {<MultiLingualContent contentID="intro_2" />}{" "}
                <Link
                  href="https://www.threefingers.org"
                  target="_blank"
                  bgGradient="linear(to-r,orange.400, yellow.400)"
                  bgClip="text"
                >
                  threefingers.org
                </Link>{" "}
                {<MultiLingualContent contentID="intro_3" />}
                <br />
                <br />
                {<MultiLingualContent contentID="intro_4" />}{" "}
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
                  to="/create"
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
  } else {
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
                {<MultiLingualContent contentID="intro_1" />} <br />
                <br />{" "}
                <Link
                  href="https://www.threefingers.org"
                  target="_blank"
                  bgGradient="linear(to-r,orange.400, yellow.400)"
                  bgClip="text"
                >
                  threefingers.org
                </Link>{" "}
                {<MultiLingualContent contentID="intro_2" />}{" "}
                {<MultiLingualContent contentID="intro_3" />}
                <br />
                <br />
                {<MultiLingualContent contentID="intro_4" />}{" "}
                <Link
                  as={ReactRouterLink}
                  bgGradient="linear(to-r,orange.400, yellow.400)"
                  bgClip="text"
                  to="/search"
                >
                  هنا
                </Link>
                <br />
                كما يمكنكم ايضا أن
                <Link
                  as={ReactRouterLink}
                  bgGradient="linear(to-r,orange.400, yellow.400)"
                  bgClip="text"
                  to="/create"
                >
                  {" "}
                  تشاركوا
                </Link>{" "}
                بإعمالكم الفنيه
              </Heading>
            </Stack>
          </Stack>
        </Container>
      </>
    );
  }
};
export default Introduction;
