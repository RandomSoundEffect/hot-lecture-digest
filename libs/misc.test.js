const { test, expect } = require('@jest/globals');
const misc = require('./misc');

test('isVideo("asdf") === false', () => {
  expect(misc.isVideo("asdf")).toBe(false);
});

test('isVideo("asdf.avi") === true', () => {
  expect(misc.isVideo("asdf.avi")).toBe(true);
});

test('isVideo("asdf.mp4") === true', () => {
  expect(misc.isVideo("asdf.mp4")).toBe(true);
});

test('isVideo("asdf.mp3") === false', () => {
  expect(misc.isVideo("asdf.mp3")).toBe(false);
});