import ImagePopover from "./ImagePopover.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

test("renders Intro component", () => {
  render(
    <>
      <ChakraProvider>
        <ImagePopover
          popoverImageDetails={{
            imageSrc: "nada.jpeg",
            imageDescription: "beautiful",
            imageArtist: "tayeb salih",
            imageDate: "01-01-1982",
          }}
          isOpen={true}
          onClose={() => false}
        />
      </ChakraProvider>
    </>
  );
  expect(screen.getByText("tayeb salih")).toBeInTheDocument();
});
