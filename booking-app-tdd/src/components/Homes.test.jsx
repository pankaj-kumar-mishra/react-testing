import {
  act,
  getAllByTestId,
  getNodeText,
  render,
} from "@testing-library/react";
import React from "react";
import apiClient from "../services/apiClient";
import bookingDialog from "../services/bookingDialog";
import Homes from "./Homes";

let container = null;

beforeEach(async () => {
  jest.spyOn(apiClient, "getHomes").mockImplementation(() => {
    return Promise.resolve([
      {
        title: "Test home 1",
        image: "listing.jpg",
        location: "Test location 1",
        price: "1",
      },
      {
        title: "Test home 2",
        image: "listing.jpg",
        location: "Test location 2",
        price: "2",
      },
      {
        title: "Test home 3",
        image: "listing.jpg",
        location: "Test location 3",
        price: "3",
      },
    ]);
  });

  container = render(<Homes />).container;

  await act(async () => {});
});

it("should show homes", () => {
  //   expect(true).toBe(true);
  const homes = getAllByTestId(container, "home");
  //   console.log(container.innerHTML);
  expect(homes.length).toBeGreaterThan(0);
});

it("should show home title", () => {
  const homeTitles = getAllByTestId(container, "home-title");
  expect(getNodeText(homeTitles[0])).toBe("Test home 1");
});
it("should show home image", () => {
  const homeImages = getAllByTestId(container, "home-image");
  expect(homeImages[0]).toBeTruthy();
});
it("should show home location", () => {
  const homeLocations = getAllByTestId(container, "home-location");
  expect(getNodeText(homeLocations[0])).toBe("Test location 1");
});
it("should show home price", () => {
  const homePrices = getAllByTestId(container, "home-price");
  expect(getNodeText(homePrices[0])).toBe("$1/night"); // According to price ui format
});

it("should show home booking button", () => {
  const homeBookingBtns = getAllByTestId(container, "home-booking-btn");
  expect(getNodeText(homeBookingBtns[0])).toBeTruthy();
});
it("should show booking dialog on book button click", () => {
  jest.spyOn(bookingDialog, "open").mockImplementation(() => {});
  const homeBookingBtns = getAllByTestId(container, "home-booking-btn");
  homeBookingBtns[0].click();
  // expect(bookingDialog.open).toHaveBeenCalled(); // Simple Click
  // Calling with paramerters
  expect(bookingDialog.open).toHaveBeenCalledWith({
    title: "Test home 1",
    image: "listing.jpg",
    location: "Test location 1",
    price: "1",
  });
});
