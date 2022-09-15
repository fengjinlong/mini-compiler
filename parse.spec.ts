import { describe, expect, test } from "vitest";
import { NodeTypes } from "./ast";
import { parser } from "./parser";
import { tokenizer, TokenTypes } from "./tokenizer";
test("parser", () => {
  const code = `(add 2 (subtract 4 2))`;

  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "2",
          },
          {
            type: "CallExpression",
            name: "subtract",
            params: [
              {
                type: "NumberLiteral",
                value: "4",
              },
              {
                type: "NumberLiteral",
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };
  expect(tokenizer(code)).toEqual(tokens);
});
test("number", () => {
  const tokens = [{ type: TokenTypes.Number, value: "2" }];
  const ast = {
    type: NodeTypes.Program,
    body: [{ type: NodeTypes.NumberLiteral, value: "2" }],
  };
  expect(parser(tokens)).toEqual(ast);
});

test("callExpression", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  const ast = {
    type: NodeTypes.Program,

    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});

test("two callExpression", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});
