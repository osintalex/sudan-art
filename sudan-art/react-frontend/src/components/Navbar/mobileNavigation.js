import { Flex, Link, Stack, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { handleClick } from "./clickHandler.js";
import { NAV_ITEMS } from "./navItems.js";
import { LanguageContext } from "../../multilingualContext/context.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";

/**
 * Component for mobile navigation.
 * @return {component} mobile navigation component.
 */
const MobileNav = () => {
  const { onToggle } = useDisclosure();
  const { language, toggleLanguage } = useContext(LanguageContext);

  /**
   * Function to programatically create the mobile navigation menu
   * @param {String} label, destructed from props
   * @param {String} contentID, destructured from props and used for navigation
   * @return {jsx} of mobile navigation menu
   */
  const MobileNavItem = ({ label, contentID }) => {
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
            onClick={handleClick.bind(this, contentID, navigate)}
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
      {NAV_ITEMS.map((contentID, index) => (
        <MobileNavItem
          key={`${contentID}-${index}`}
          label={<MultiLingualContent contentID={contentID} />}
          contentID={contentID}
        />
      ))}
      <Stack spacing={4}>
        <Link fontWeight={200} color={"gray.600"} onClick={toggleLanguage}>
          {language == "english" ? "عربي" : "English"}
        </Link>
      </Stack>
    </Stack>
  );
};

MobileNav.propTypes = {
  label: PropTypes.string,
  key: PropTypes.string,
  contentID: PropTypes.string,
};
export default MobileNav;
