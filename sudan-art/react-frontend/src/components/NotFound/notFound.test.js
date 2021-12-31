import NotFound from "./notFound.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

test("renders Intro component", () => {
  render(
    <>
      <ChakraProvider>
        <NotFound />
      </ChakraProvider>
    </>
  );
  expect(screen.getByText(/Burhan's heart/)).toBeInTheDocument();
});
