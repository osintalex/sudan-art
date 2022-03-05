import { render, screen } from "@testing-library/react";
import React from "react";
import MultiLingualContent from "./multilingualContent";
import { LanguageContext } from "../../multilingualContext/context.js";

describe("Multilingual componentt", () => {
  test("renders English OK", () => {
    const wrapper = ({ children }) => (
      <LanguageContext.Provider value={{ language: "english" }}>
        {children}
      </LanguageContext.Provider>
    );
    render(
      <>
        <MultiLingualContent contentID="nav_about" />
      </>,
      { wrapper }
    );
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });
  test("renders Arabic OK", () => {
    const wrapper = ({ children }) => (
      <LanguageContext.Provider value={{ language: "arabic" }}>
        {children}
      </LanguageContext.Provider>
    );
    render(
      <>
        <MultiLingualContent contentID="nav_about" />
      </>,
      { wrapper }
    );
    expect(screen.getByText(/نبذه/)).toBeInTheDocument();
  });
});
