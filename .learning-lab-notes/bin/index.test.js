import { getCurrentDateString } from "./utils/functions.js";

describe('it runs the test', () => {
  test('it runs', () => {
    expect(1).toEqual(1)
  })

  test('it returns a date (year-month-date)', () => {
    const date = getCurrentDateString();
    const match = /^([0-9]){4}-([0-9]){2}-([0-9]){2}/g

    expect(date).toMatch(match)
  })

})