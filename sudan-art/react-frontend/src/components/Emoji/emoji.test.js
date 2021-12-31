import Emoji from "./emoji.js";
import { render, screen } from "@testing-library/react";

test("renders Emoji component", () => {
  render(
    <>
      <Emoji label="test emoji" />
    </>
  );
  expect(screen.getByLabelText("test emoji")).toBeInTheDocument();
});
