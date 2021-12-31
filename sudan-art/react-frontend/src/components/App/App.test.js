import App from "./App.js"
import { render, screen } from "@testing-library/react";

/**
 * Unit test for App component; note that this is currently breaking because I think I need to mock out
 * the BrowserRouter component from react router. Many elements from react router that break the tests are
 * mocked already in src/setupTests.js
 */
test("renders App component", () => {
    render(<App />);
    expect(screen.getByLabelText("loading spinner")).toBeInTheDocument();
  });