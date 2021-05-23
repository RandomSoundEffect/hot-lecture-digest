const { test, expect } = require('@jest/globals');
const req = require('./reqtrans');

test('getConfig("en-US") must not have "speechContexts" and "audioTopic" properties', () => {
  expect(req.getConfig("en-US")).not.toHaveProperty("speechContexts", "audioTopic");
});

test('getConfig("en-US", { phrases: "stuff" }) must have "speechContexts" property', () => {
  expect(req.getConfig("en-US", { phrases: "stuff" })).toHaveProperty("speechContexts");
  expect(req.getConfig("en-US", { phrases: "stuff" })).not.toHaveProperty("audioTopic");
});