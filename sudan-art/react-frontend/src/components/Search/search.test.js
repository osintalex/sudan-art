import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./search.js";
import { ChakraProvider } from "@chakra-ui/react";

/**
 * This isn't working at present since it isn't returning search results and I am unsure why.
 */
describe("Search Component", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 1,
            next: null,
            previous: null,
            results: [
              {
                artist: "anon",
                tags: "sudan,flag,protest",
                image: "nothing.jpeg",
                date_uploaded: "2021-12-24",
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  test("Search form submission", async () => {
    render(
      <ChakraProvider>
        <Search />
      </ChakraProvider>
    );
    userEvent.type(screen.getByText(/search terms/i), "sudan art");
    userEvent.type(screen.getByText(/artist/i), "anon");
    userEvent.type(screen.getByText(/date from/i), "01-01-1982");
    userEvent.type(screen.getByText(/date to/i), "31-12-2022");
    userEvent.click(screen.getByLabelText("search button"));
    await waitFor(() => {
      expect(screen.getAllByLabelText("search result image")).toHaveLength(1);
    });
  });
});
