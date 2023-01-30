import { withMatchingBracket } from '../util.js';

describe("Validate 'withMatchingBracket' utility function", function () {
  it("should correctly identify posible VALID values", function () {
    expect(withMatchingBracket('')).toBe(true);
    expect(withMatchingBracket('{}')).toBe(true);
    expect(withMatchingBracket('{a}')).toBe(true);
    expect(withMatchingBracket('{a}{b}')).toBe(true);
    expect(withMatchingBracket('{{a}}')).toBe(true);
    expect(withMatchingBracket('{a}{b}{c}')).toBe(true);
    expect(withMatchingBracket('{a}{{b}{c}}')).toBe(true);
  });
  
  it("should correctly identify posible INVALID values", function () {
    expect(withMatchingBracket(1)).toBe(false);
    expect(withMatchingBracket({})).toBe(false);
    expect(withMatchingBracket('}{')).toBe(false);
    expect(withMatchingBracket('{{}')).toBe(false);
    expect(withMatchingBracket('a}')).toBe(false);
    expect(withMatchingBracket('{a}}')).toBe(false);
    expect(withMatchingBracket('{a}b}{c}')).toBe(false);
    expect(withMatchingBracket('{a}{{b}{c}')).toBe(false);
  });
});
