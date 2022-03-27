export const $ = (selector) => document.querySelector(selector);

export const randomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};
