import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import LandingPage from "./landing.js";

describe("Landing Page", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              artist: "hello",
              tags: "my,fake,tag",
              src: "test.jpeg",
            },
            {
              artist: "hello",
              tags: "my,fake,tag",
              src: "test.jpeg",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  test("Renders loading correctly", () => {
    render(<LandingPage />);
    act(() =>
      expect(screen.getByLabelText("loading spinner")).toBeInTheDocument()
    );
  });
  test("Images should have loaded after making data returned by fetch", async () => {
    render(<LandingPage />);
    await waitFor(() => {
      expect(screen.getAllByLabelText("revolutionary art image")).toHaveLength(2);
    });
  });
});
