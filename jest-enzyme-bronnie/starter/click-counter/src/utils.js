export const testAttr = (val) => {
  return process.env.NODE_ENV === "test" ? { "data-test": val } : {};
};
