import {
  createCallExpressionNode,
  createNumberNode,
  createRootNode,
} from "./ast";
import { Token, TokenTypes } from "./tokenizer";

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createRootNode();

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value);
    }

    // 表达式 (add(1,2))  左括号开始
    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current];
      const node = createCallExpressionNode(token.value);
      token = tokens[++current];
      // 不是 ) 就继续  右括号结束
      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
    throw new Error(`不认识的 token: ${token}`);
  }
  while (current < tokens.length) {
    rootNode.body.push(walk());
  }
  return rootNode;
}
