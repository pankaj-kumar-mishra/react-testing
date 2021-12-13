import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Hello from "./Hello";

let comp = null;

beforeEach(() => {
  comp = render(<Hello />);
});

it("Component should show Hello text", () => {
  //   comp.debug();
  const helloText = comp.getByText("Hello");
  expect(helloText).toBeTruthy();

  expect(helloText.tagName).toBe("H1");
  expect(helloText.textContent).toBe("Hello");

  // getBy, queryBy, findBy
  // getBy => return element if not found or more than one then throw error
  // queryBy => return element if not found then return null
  //            and if found more than one then throw error

  // findBy => if work exactly same as getBy with async call

  const headingEl = comp.getByTestId("my-heading");
  expect(headingEl.textContent).toBe("Hello");
});

it("Should button has click function", () => {
  const clickBtn = comp.getByRole("button");
  fireEvent.click(clickBtn);
});

it("Should handle onChange", () => {
  const myName = "Pankaj";
  const myInput = comp.getByRole("textbox"); // input not work
  expect(myInput).toHaveValue("");

  fireEvent.change(myInput, { target: { value: myName } });
  expect(myInput).toHaveValue(myName);
});
