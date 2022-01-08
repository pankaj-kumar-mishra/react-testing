import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 *
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

// MSG refer selector method on enzyme docs "[attrributeName=attributeValue]"
test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test("counter display starts at 0", () => {
  const wrapper = setup();
  const countText = findByTestAttr(wrapper, "count-text").text();
  //   MSG  .text always return a string so we use "0" (not 0)
  expect(countText).toBe("0");
});

/*  NOTE
1 > (Functionality) checking the counter increment state
2 > (Behaviour) checking the counter increment display
*/
describe("Increment Button", () => {
  test("renders increment button", () => {
    const wrapper = setup();
    const incrementBtn = findByTestAttr(wrapper, "increment-button");
    expect(incrementBtn.length).toBe(1);
  });

  test("clicking increment button increment counter", () => {
    const wrapper = setup();

    // Find the button and click
    const incrementBtn = findByTestAttr(wrapper, "increment-button");
    incrementBtn.simulate("click");

    // find the display and check number increment or not
    const countText = findByTestAttr(wrapper, "count-text").text();
    expect(countText).toBe("1");
  });
});

// PART Challenges
/*
1. Decrement button
Create a new button that subtracts 1 from the counter

2. No count below 0
Don't let the counter go below zero.
if the counter is at 0 and the decrement button is clicked:
don't decrement the counter
display an error message saying the counter can't go below zero

3. Remove error when increment button is clicked
If error is showing and increment button is clicked, clear the error.
*/

describe("Decrement Button", () => {
  test("renders decrement button", () => {
    const wrapper = setup();
    const decrementBtn = findByTestAttr(wrapper, "decrement-button");
    expect(decrementBtn.length).toBe(1);
  });

  test("decrement when counter > 0", () => {
    const wrapper = setup();

    const incrementBtn = findByTestAttr(wrapper, "increment-button");
    incrementBtn.simulate("click");

    const decrementBtn = findByTestAttr(wrapper, "decrement-button");
    decrementBtn.simulate("click");

    const countText = findByTestAttr(wrapper, "count-text").text();
    expect(countText).toBe("0");
  });

  test("count does not go below 0", () => {
    const wrapper = setup();

    const decrementBtn = findByTestAttr(wrapper, "decrement-button");
    decrementBtn.simulate("click");

    const countText = findByTestAttr(wrapper, "count-text").text();
    expect(countText).toBe("0");
  });
});

describe("Error message", () => {
  test("no renders error message at the begining", () => {
    const wrapper = setup();
    const errorMsg = findByTestAttr(wrapper, "error-message");
    // expect(errorMsg.length).toBe(0);
    // expect(errorMsg.exists()).toBe(false);
    expect(errorMsg.exists()).toBeFalsy();
  });

  test("shows when count is zero and decrement button clicked", () => {
    const wrapper = setup();

    const decrementBtn = findByTestAttr(wrapper, "decrement-button");
    decrementBtn.simulate("click");

    const errorMsg = findByTestAttr(wrapper, "error-message");
    expect(errorMsg.exists()).toBeTruthy();
  });

  test("Hides after increment button clicked", () => {
    const wrapper = setup();

    const decrementBtn = findByTestAttr(wrapper, "decrement-button");
    decrementBtn.simulate("click");

    const incrementBtn = findByTestAttr(wrapper, "increment-button");
    incrementBtn.simulate("click");

    const errorMsg = findByTestAttr(wrapper, "error-message");
    expect(errorMsg.exists()).toBeFalsy();
  });
});
