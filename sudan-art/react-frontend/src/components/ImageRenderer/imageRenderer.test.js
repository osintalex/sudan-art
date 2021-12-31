import ImageRenderer from "./imageRenderer";
import { render, screen } from "@testing-library/react";

test("renders Image Renderer component", () => {
  render(
    <>
      <ImageRenderer label="test image" />
    </>
  );
  expect(screen.getByLabelText("test image")).toBeInTheDocument();
});
