import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import Contact from "./contact.js";

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
