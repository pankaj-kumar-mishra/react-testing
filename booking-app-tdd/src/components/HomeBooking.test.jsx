import React from "react";
import { render, getByTestId, fireEvent, act } from "@testing-library/react";
import HomeBooking from "./HomeBooking";
import apiClient from "../services/apiClient";
import bookingDialog from "../services/bookingDialog";
import notificationToast from "../services/notificationToast";

const mockedHome = {
  title: "Test home 1",
  image: "listing.jpg",
  location: "Test location 1",
  price: "100",
};

let container = null;

beforeEach(() => {
  container = render(<HomeBooking item={mockedHome} />).container;
});

// it("Should show Dialog content", () => {
//   console.log(container.innerHTML);
//   expect(true).toBeTruthy();
// });

it("Should show title", () => {
  expect(getByTestId(container, "title").textContent).toBe("Test home 1");
});
it("Should show price", () => {
  expect(getByTestId(container, "price").textContent).toBe("100 per night");
});
it("Should show check-in", () => {
  expect(getByTestId(container, "check-in")).toBeTruthy();
});
it("Should show check-out", () => {
  expect(getByTestId(container, "check-out")).toBeTruthy();
});
it("should calculate total", () => {
  // enter check-in data 2021-12-11
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-11" },
  });
  // enter check-out data 2021-12-15
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-15" },
  });
  // total 100 * 4 = 400
  expect(getByTestId(container, "total").textContent).toBe("Total: $400");
});
it("should show '--' on invalid dates range", () => {
  // enter check-in data 2021-12-11
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-15" },
  });
  // enter check-out data 2021-12-15
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-11" },
  });
  // total 100 * 4 = 400
  expect(getByTestId(container, "total").textContent).toBe("Total: $--");
});
it("should book home after clicking the Book button", () => {
  // spy on apiClient
  jest.spyOn(apiClient, "bookHome").mockImplementation(() => {
    return Promise.resolve({ message: "Home booked successfully." });
  });
  // select dates
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-11" },
  });
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-15" },
  });
  // click the book button
  getByTestId(container, "book-btn").click();
  // assert that apiClient booked the home
  expect(apiClient.bookHome).toHaveBeenCalledWith(
    mockedHome,
    "2021-12-11",
    "2021-12-15"
  );
});
it("should close the dialog and show notification after booking home", async () => {
  // spyon api client service
  jest.spyOn(apiClient, "bookHome").mockImplementation(() => {
    return Promise.resolve({ message: "Home booked successfully." });
  });
  // spyon api bookingDialog service
  jest.spyOn(bookingDialog, "close").mockImplementation(() => {});
  // spyon api notification
  jest.spyOn(notificationToast, "open").mockImplementation(() => {});

  // select dates
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-11" },
  });
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-15" },
  });
  // click the book button
  getByTestId(container, "book-btn").click();

  //   wait for asyn call to finish before move to assertion
  await act(async () => {});
  //   console.log("before assertion");

  // assert that dialog service closed the dialog
  expect(bookingDialog.close).toHaveBeenCalled();
  // assert that notification service posted a notification
  expect(notificationToast.open).toHaveBeenCalledWith(
    "Home booked successfully."
  );
});

// should show empty when no home provided
it("should show empty when no home provided", () => {
  container = render(<HomeBooking item={null} />).container;

  expect(getByTestId(container, "empty")).toBeTruthy();
});
