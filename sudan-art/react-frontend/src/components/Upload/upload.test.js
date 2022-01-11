import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Upload from "./upload.js";
import { ChakraProvider } from "@chakra-ui/react";

describe("Upload Component", () => {
  window.URL.createObjectURL = jest.fn(() => {});
  let originalFetch;
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({ status: 201 }));
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  test("Upload form input", async () => {
    render(
      <ChakraProvider>
        <Upload />
      </ChakraProvider>
    );
    const artistNameInput = screen.getByLabelText("artist-name-input");
    await userEvent.type(artistNameInput, "anonymous", { delay: 1 });
    expect(screen.getByLabelText("artist-name-input").value).toBe("anonymous");
  });
  test("Invalid form submission", async () => {
    render(
      <ChakraProvider>
        <Upload />
      </ChakraProvider>
    );
    const artistNameInput = screen.getByLabelText("artist-name-input");
    await userEvent.type(artistNameInput, "anonymous", { delay: 1 });
    userEvent.click(screen.getByLabelText("upload-form-submission"));
    await waitFor(() => {
      expect(screen.getAllByText(/please resubmit the form/i)).toHaveLength(1);
    });
  });
  test("Successful form submission", async () => {
    render(
      <ChakraProvider>
        <Upload />
      </ChakraProvider>
    );
    // TODO: Wrap this stuff in act(() and poss other stuff
    // File upload
    const file = new File(["(⌐□_□)"], "al-mahdi.png", { type: "image/png" });
    const imageInput = screen.getByLabelText("image-upload");
    fireEvent.change(imageInput, { target: { files: [file] } });
    await waitFor(() => screen.getByLabelText("image-preview"));

    // Tags
    const taggerInput = screen.getByLabelText("image-tagger");
    await userEvent.type(taggerInput, "sudanese", { delay: 1 });
    fireEvent.keyUp(taggerInput, { key: "Enter", code: "Enter", charCode: 13 });
    await userEvent.type(taggerInput, "revolutionary", { delay: 1 });
    fireEvent.keyUp(taggerInput, { key: "Enter", code: "Enter", charCode: 13 });
    await userEvent.type(taggerInput, "art", { delay: 1 });
    fireEvent.keyUp(taggerInput, { key: "Enter", code: "Enter", charCode: 13 });

    // Artist Name
    const artistNameInput = screen.getByLabelText("artist-name-input");
    await userEvent.type(artistNameInput, "anonymous", { delay: 1 });
    userEvent.click(screen.getByLabelText("upload-form-submission"));

    // Test the result
    await waitFor(() => {
      expect(
        screen.getAllByText(/we've received your submission/i)
      ).toHaveLength(1);
    });
  });
});
