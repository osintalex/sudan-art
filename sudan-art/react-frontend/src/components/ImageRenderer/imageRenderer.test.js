import { render, screen } from "@testing-library/react";
import React from "react";
import ImageRenderer from "./imageRenderer";

test("renders Image Renderer component", () => {
  render(
    <>
      <ImageRenderer label="test image" />
    </>
  );
  expect(screen.getByLabelText("test image")).toBeInTheDocument();
});
