export const withMatchingBracket = (str) => {
  // Do a quick input validation
  if (typeof str !== "string") {
    return false;
  }

  // Do validation logic.
  // The idea is count all the opening bracket,
  // then if closing backet is encountered, do a deduction on the counter.
  // But if closing backet is encountered without the current opening, terminate the operation and return false.
  let openingCtr = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "{") {
      openingCtr++;
    } else if (str.charAt(i) === "}") {
      if (openingCtr === 0) {
        return false;
      }
      openingCtr--;
    }
  }
  return openingCtr === 0;
};
