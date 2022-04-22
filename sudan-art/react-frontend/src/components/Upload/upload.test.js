import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Upload from "./upload.js";
import { LanguageContext } from "../../multilingualContext/context.js";

describe("Upload Component", () => {
  const wrapper = ({ children }) => (
    <LanguageContext.Provider value={{ language: "english" }}>
      {children}
    </LanguageContext.Provider>
  );
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
      </ChakraProvider>,
      { wrapper }
    );
    const artistNameInput = screen.getByLabelText("artist-name-input");
    await userEvent.type(artistNameInput, "anonymous", { delay: 1 });
    expect(screen.getByLabelText("artist-name-input").value).toBe("anonymous");
  });
  test("Invalid form submission", async () => {
    render(
      <ChakraProvider>
        <Upload />
      </ChakraProvider>,
      { wrapper }
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
      </ChakraProvider>,
      { wrapper }
    );

    // File upload
    const file = new File(["(⌐□_□)"], "al-mahdi.png", { type: "image/png" });
    const imageInput = screen.getByLabelText("image-upload");
    fireEvent.change(imageInput, { target: { files: [file] } });
    await screen.findByLabelText("image-preview");

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

    // URL
    const urlInput = screen.getByLabelText("url-input");
    await userEvent.type(urlInput, "example.com", { delay: 1 });
    userEvent.click(screen.getByLabelText("upload-form-submission"));

    // Test the result
    await waitFor(() => {
      expect(screen.getAllByText(/received your submission/i)).toHaveLength(1);
    });
  });
});
