import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummayForm";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(button).toBeDisabled();
});

test("enable button on first click and disable on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("PopOver respond on mouse hover", async () => {
  render(<SummaryForm />);
  // popover starts with hidden
  const noPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(noPopover).not.toBeInTheDocument();

  const termsSpan = screen.getByText(/Terms and Conditions/);
  // onmouse hover show popover
  userEvent.hover(termsSpan);
  const popover1 = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(popover1).toBeInTheDocument();
  // onmouse unhover hide popover
  //   userEvent.unhover(termsSpan);
  //   const popover2 = screen.queryByText(
  //     /No ice cream will actually be delivered/i
  //   );
  //   expect(popover2).toBeInTheDocument();

  //   NOTE  remove act(...) warning. because bydefault testingLibrary using act
  userEvent.unhover(termsSpan);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  );
});
