import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import Intro from "./intro.js";

test("renders Intro component", () => {
  render(
    <>
      <ChakraProvider>
        <Intro />
      </ChakraProvider>
    </>
  );
  expect(screen.getByText(/your own art/)).toBeInTheDocument();
});
