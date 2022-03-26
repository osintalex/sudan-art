import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import ImagePopover from "./ImagePopover.js";
import { LanguageContext } from "../../multilingualContext/context.js";

test("renders Intro component", () => {
  const wrapper = ({ children }) => (
    <LanguageContext.Provider value={{ language: "english" }}>
      {children}
    </LanguageContext.Provider>
  );
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
    </>,
    { wrapper }
  );
  expect(screen.getByText("tayeb salih")).toBeInTheDocument();
});
