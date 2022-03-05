import { ChakraProvider } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Browse from "./browse";

describe("Browse Component", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 1,
            next: true,
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
  test("Browse loads image with has more button", async () => {
    render(
      <ChakraProvider>
        <Browse />
      </ChakraProvider>
    );
    await waitFor(() => {
      expect(screen.getAllByLabelText("search-results")).toHaveLength(1);
      expect(screen.getAllByLabelText("has-more-button")).toHaveLength(1);
    });
  });
});
