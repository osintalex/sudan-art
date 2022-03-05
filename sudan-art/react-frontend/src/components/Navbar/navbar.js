import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import { handleClick } from "./clickHandler.js";
import DesktopNav from "./desktopNavigation.js";
import logo from "./eye_logo.svg";
import MobileNav from "./mobileNavigation.js";

// Based off the with sub navigation one here https://chakra-templates.dev/navigation/navbar
/**
 * Main navigation component with destkop and mobile versions.
 * @return {component} navbar component.
 */
export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#d7e3eb"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src={logo}
            w
            boxSize="30px"
            className="nav-image"
            objectFit="cover"
            style={{ filter: "invert(1)", cursor: "pointer" }}
            onClick={handleClick.bind(this, "Home", navigate)}
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            fontSize={"sm"}
            fontWeight={600}
            id="landing-button"
            height="34px"
          >
            <a
              href="https://www.paypal.com/paypalme/sabirbahari"
              target="_blank"
              rel="noreferrer"
            >
              Donate
            </a>
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
