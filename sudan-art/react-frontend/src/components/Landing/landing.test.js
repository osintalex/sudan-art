import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import LandingPage from "./landing.js";

test("Renders loading correctly", async () => {
  render(<LandingPage />);
  await act(async () =>
    waitFor(() => {
      expect(screen.getByLabelText("loading spinner")).toBeInTheDocument();
    })
  );
});
test("Images should have loaded after making data returned by fetch", async () => {
  render(<LandingPage />);
  await waitFor(() => {
    expect(screen.getAllByLabelText("revolutionary art image")).toHaveLength(20);
  });
});
