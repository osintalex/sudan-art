import { useContext } from "react";
import { Box, Stack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { NAV_ITEMS } from "./navItems.js";
import { handleClick } from "./clickHandler.js";
import { LanguageContext } from "../../multilingualContext/context.js";

/**
 * Component for destkop navigation.
 */
const DesktopNav = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "gray.50";
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem}>
          <Link
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            onClick={handleClick.bind(this, navItem, navigate)}
          >
            {navItem}
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
          {language}
        </Link>
      </Box>
    </Stack>
  );
};

export default DesktopNav;
