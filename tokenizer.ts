export enum TokenTypes {
  Paren,
  Name,
  Number,
}
export interface Token {
  type: TokenTypes;
  value: string;
}
// 词法分析
export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  while (current < code.length) {
    let char = code[current];
    //  空格
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      while (!!char && LETTERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }

    const NUMBERS = /[0-9]/i;

    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
  }
  return tokens;
}