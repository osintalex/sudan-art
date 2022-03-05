import { Flex, Link, Stack, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { handleClick } from "./clickHandler.js";
import { NAV_ITEMS } from "./navItems.js";
import { LanguageContext } from "../../multilingualContext/context.js";

/**
 * Component for mobile navigation.
 * @return {component} mobile navigation component.
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
            /* eslint-disable no-invalid-this */
            onClick={handleClick.bind(this, label, navigate)}
            /* eslint-disable no-invalid-this */
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

MobileNav.propTypes = {
  label: PropTypes.string.isRequired,
};
export default MobileNav;
