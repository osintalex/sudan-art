import { useContext } from "react";
import { Flex, Stack, useDisclosure, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { NAV_ITEMS } from "./navItems.js";
import { handleClick } from "./clickHandler.js";
import { LanguageContext } from "../../multilingualContext/context.js";

/**
 * Component for mobile navigation.
 */
const MobileNav = () => {
  /**
   * Function to programatically create the mobile navigation menu
   * @param {String} label, destructed from props
   * @returns JSX of mobile navigation menu
   */

  const { onToggle } = useDisclosure();
  const { language, toggleLanguage } = useContext(LanguageContext);
  
  const MobileNavItem = ({ label }) => {
    const navigate = useNavigate();

    return (
      <Stack spacing={4}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Link
            fontWeight={200}
            color={"gray.600"}
            onClick={handleClick.bind(this, label, navigate)}
          >
            {label}
          </Link>
        </Flex>
      </Stack>
    );
  };

  return (
    <Stack bg={"gray.100"} p={4} display={{ md: "none" }} onClick={onToggle}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem} label={navItem} />
      ))}
      <Stack spacing={4}>
        <Link fontWeight={200} color={"gray.600"} onClick={toggleLanguage}>
          {language}
        </Link>
      </Stack>
    </Stack>
  );
};

export default MobileNav;
