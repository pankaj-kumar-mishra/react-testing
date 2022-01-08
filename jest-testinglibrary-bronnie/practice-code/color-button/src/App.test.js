import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("page has a title", () => {
  render(<App />);
  const titleText = screen.getByRole("heading", { name: /Color button app/i });
  expect(titleText).toHaveClass("app-title");
});

test("button has correct initial color", () => {
  render(<App />);
  // checking button with specified name
  const colorBtn = screen.getByRole("button", {
    name: /Change to Midnight Blue/i,
  });
  // checking button have style
  expect(colorBtn).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // Onclick of button, change background color to blue, button name blue to red
  fireEvent.click(colorBtn);
  expect(colorBtn).toHaveStyle({ backgroundColor: "MidnightBlue" });
  // expect(colorBtn.textContent).toBe("Change To red");
  expect(colorBtn).toHaveTextContent(/Change to Medium Violet Red/i);
});

// Check box functionality
test("Initial condition of check box and color button", () => {
  render(<App />);
  // Check that button starts out enabled
  const colorBtn = screen.getByRole("button", {
    name: /Change to Midnight Blue/i,
  });
  expect(colorBtn).toBeEnabled();

  // Check that checkbox starts out unchecked
  // const checkBox = screen.getByTestId("toggle-check");
  const checkBox = screen.getByRole("checkbox", {
    name: /Disable color button/i,
  });
  expect(checkBox).not.toBeChecked();
});

test("On checkbox click, make button disable/enable respectively", () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", {
    name: /Change to Midnight Blue/i,
  });
  // const checkBox = screen.getByTestId("toggle-check");
  const checkBox = screen.getByRole("checkbox", {
    name: /Disable color button/i,
  });

  fireEvent.click(checkBox);
  expect(colorBtn).toBeDisabled();
  fireEvent.click(checkBox);
  expect(colorBtn).toBeEnabled();
});

test("disabled button color grey and on enabled it revert to red", () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", {
    name: /Change to Midnight Blue/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /Disable color button/i,
  });

  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "grey" });
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked button color blue, checkbox clicked color grey and on enabled it revert to blue", () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", {
    name: /Change to Midnight Blue/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /Disable color button/i,
  });

  fireEvent.click(colorBtn);
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "grey" });
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

// Unit Testing
describe("Spaces before camel-case capital letters", () => {
  test("should works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("should works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("should work for multiple inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightVioletRed")).toBe(
      "Midnight Violet Red"
    );
  });
});
