import { Box, Link, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { handleClick } from "./clickHandler.js";
import { NAV_ITEMS } from "./navItems.js";
import { LanguageContext } from "../../multilingualContext/context.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";

/**
 * Component for destkop navigation.
 * @return {component} Desktop navigation component.
 */
const DesktopNav = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "gray.50";
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((contentID) => (
        <Box key={contentID}>
          <Link
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            /* eslint-disable no-invalid-this */
            onClick={handleClick.bind(this, contentID, navigate)}
            /* eslint-enable no-invalid-this */
          >
            {<MultiLingualContent contentID={contentID} />}
          </Link>
        </Box>
      ))}
      <Box key={"language-switch"}>
        <Link
          p={2}
          fontSize={"sm"}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
          onClick={toggleLanguage}
        >
          {language == "english" ? "عربي" : "English"}
        </Link>
      </Box>
    </Stack>
  );
};

export default DesktopNav;
