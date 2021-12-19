import { Flex, Stack, useDisclosure, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { NAV_ITEMS } from "./navItems.js";
import { handleClick } from "./clickHandler.js";
const MobileNav = () => {
  const MobileNavItem = ({ label }) => {
    const { onToggle } = useDisclosure();
    const navigate = useNavigate();

    return (
      <Stack spacing={4} onClick={onToggle}>
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
    <Stack bg={"gray.100"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

export default MobileNav;
