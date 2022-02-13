import Navbar from "./navbar.js";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { LanguageContext } from "../../multilingualContext/context.js";

test("renders Navbar component", () => {
  const wrapper = ({ children }) => (
    <LanguageContext.Provider value={{ language: "english" }}>
      {children}
    </LanguageContext.Provider>
  );
  render(
    <>
      <ChakraProvider>
        <Navbar />
      </ChakraProvider>
    </>,
    { wrapper }
  );
  expect(screen.getAllByText(/About|Upload|Search|Contact/)).toHaveLength(8);
});
