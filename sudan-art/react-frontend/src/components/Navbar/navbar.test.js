import Navbar from "./navbar.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

test("renders Intro component", () => {
  render(
    <>
      <ChakraProvider>
        <Navbar />
      </ChakraProvider>
    </>
  );
  expect(screen.getAllByText(/About|Upload|Search|Contact/)).toHaveLength(8);
});
