import { withMatchingBracket } from './util.js';

console.log(withMatchingBracket('{}') === true);
console.log(withMatchingBracket('}{') === false);
console.log(withMatchingBracket('{{}') === false);
console.log(withMatchingBracket('') === true);
console.log(withMatchingBracket('{abcdef}') === true);
