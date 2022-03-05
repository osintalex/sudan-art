import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import NotFound from "./notFound.js";
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
        <NotFound />
      </ChakraProvider>
    </>,
    { wrapper }
  );
  expect(screen.getByText(/Burhan's heart/)).toBeInTheDocument();
});
