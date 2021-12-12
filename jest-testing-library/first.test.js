// it("first", () => {
//   expect(2 + 3).toBe(5);
// });

// describe("groupTests", () => {
//   it("one", () => {
//     expect(1 + 1).toBe(2);
//   });
//   it("two", () => {
//     expect(1 + 1).toBe(2);
//   });
// });

// let myValue = 1;
// it("variable check", () => {
//   expect(myValue).toBe(1);
// });

// function add(x, y) {
//   return x + y;
// }
// it("function check", () => {
//   expect(add(2, 3)).toBe(5);
// });

// START   before / after
// // beforeEach => executed before every test
// beforeEach(() => {
//   console.log("Before each test");
//   myValue = 10;
// });
// // afterEach => executed after every test
// afterEach(() => {
//   console.log("After each test", myValue);
// });

// // beforeAll => executed before first test (one time)
// beforeAll(() => {
//   console.log("Before All test");
// });
// // afterAll => executed after last test (one time)
// afterAll(() => {
//   console.log("After All test");
// });

// it("first run", () => {
//   myValue++;
//   console.log("first", myValue);
// });
// it("second run", () => {
//   console.log("second", myValue);
// });
// END  before / after

// START  skip / only / timeout
// jest.setTimeout(15000);

// it("first", () => {
//   console.log("first");
//   expect(true).toBeTruthy();
// });
// // NOTE  only => powerful than skip
// // only => execute this test only
// // it.only("second", () => {
// //   console.log("second");
// //   expect(true).toBeTruthy();
// // });
// // skip => execute other tests except this test
// // it.skip("third", () => {
// //   console.log("third");
// //   expect(true).toBeTruthy();
// // });
// // timeout => default is 5000
// // it("individual timeout", () => {
// //   console.log("individual timeout");
// //   expect(true).toBeTruthy();
// // }, 1000);
// it("four", () => {
//   console.log("four");
//   expect(true).toBeTruthy();
// });
// END  skip / only / timeout

// START  Loops in test (test.each() / it.each())
// const numbers = [1, 5, 3, 8];
// it.each(numbers)("add 2 to %i", (item) => {
//   console.log(">", item);
//   expect(item + 2).toBe(2 + item);
// });

// const numbers2 = [
//   [1, 2, 3],
//   [4, 3, 7],
//   [9, 1, 10],
// ];
// it.each(numbers2)("add %i to %i should be %i", (a, b, total) => {
//   console.log(">>", a, b, total);
//   expect(a + b).toBe(total);
// });
// END  Loops in test (test.each() / it.each())

// START  Matchers
// const myVal = 5;
// const myName = "Pankaj";
// const animals = ["lion", "zebra", "snake"];

// it("different types of matchers", () => {
//   expect(myVal).toBe(5);
//   expect(myVal).toEqual(5);

//   expect(myVal).toBeGreaterThan(3);
//   expect(myVal).toBeLessThan(8);

//   expect(myVal).toBeGreaterThanOrEqual(3);
//   expect(myVal).toBeLessThanOrEqual(8);

//   //   expect(myName).toMatch(/Pan/);
//   expect(myName).toMatch(/pan/i); // "/pan/gi"

//   expect(animals).toContain("zebra");
// });

// const p = null;
// const q = [];
// // falsy: false, 0, null, undefined, NaN, ""
// it("toBeTruthy and toBeFalsy", () => {
//   //   expect(p).toBeNull(); // passed
//   //   expect(p).toBeUndefined(); // failed
//   //   to avoid this type of behaviour we use falsy
//   expect(p).toBeFalsy();
//   expect(p).not.toBeTruthy();

//   expect(q).toBeTruthy();
// });
// END  Matchers

// START  Testing Errors
function check() {
  throw new Error("Fatal mistake");
}

it("check error", () => {
  expect(check).toThrow();
  expect(check).toThrow(Error);
  expect(check).toThrow("Fatal mistake");
  expect(check).toThrow(/fatal/i);
});

// END  Testing Errors
