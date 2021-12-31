import Intro from "./intro.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

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
