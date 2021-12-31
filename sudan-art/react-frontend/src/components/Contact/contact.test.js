import Contact from "./contact.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

test("renders Contact component", () => {
  render(
    <>
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    </>
  );
  expect(screen.getByText(/sudancoup.com/)).toBeInTheDocument();
});
