import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import Contact from "./contact.js";
import { LanguageContext } from "../../multilingualContext/context.js";

test("renders Contact component", () => {
  const wrapper = ({ children }) => (
    <LanguageContext.Provider value={{ language: "english" }}>
      {children}
    </LanguageContext.Provider>
  );
  render(
    <>
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    </>,
    { wrapper }
  );
  expect(screen.getByText(/sudancoup.com/)).toBeInTheDocument();
});
