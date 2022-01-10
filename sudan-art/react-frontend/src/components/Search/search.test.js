import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./search.js";
import { ChakraProvider } from "@chakra-ui/react";

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
  test("Search form input", async () => {
    render(
      <ChakraProvider>
        <Search />
      </ChakraProvider>
    );
    const searchTermsInput = screen.getByLabelText("search terms input");
    await userEvent.type(searchTermsInput, "sudan", { delay: 1 });
    expect(screen.getByLabelText("search terms input").value).toBe("sudan");
  });
  test("Search form submission", async () => {
    render(
      <ChakraProvider>
        <Search />
      </ChakraProvider>
    );
    const searchTermsInput = screen.getByLabelText("search terms input");
    await userEvent.type(searchTermsInput, "sudan", { delay: 1 });
    userEvent.click(screen.getByLabelText("search button"));
    await waitFor(() => {
      expect(screen.getAllByLabelText("search-results")).toHaveLength(1);
    });
  });
});
