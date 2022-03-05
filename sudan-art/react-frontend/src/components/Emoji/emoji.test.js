import { render, screen } from "@testing-library/react";
import React from "react";
import Emoji from "./emoji.js";

test("renders Emoji component", () => {
  render(
    <>
      <Emoji label="test emoji" />
    </>
  );
  expect(screen.getByLabelText("test emoji")).toBeInTheDocument();
});
