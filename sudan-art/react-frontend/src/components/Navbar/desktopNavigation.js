import { Box, Stack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { NAV_ITEMS } from "./navItems.js";
import { handleClick } from "./clickHandler.js";

/**
 * Component for destkop navigation.
 */
const DesktopNav = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "gray.50";
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            onClick={handleClick.bind(this, navItem.label, navigate)}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
