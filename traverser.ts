import {
  CallExpressionNode,
  ChildNode,
  NodeTypes,
  NumberLiteralNode,
  RootNode,
} from "./ast";
type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption;
}
export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 深度优先遍历
  // visitor
  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    // enter
    const visitorObj = visitor[node.type];
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        console.log("ss");
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
    }

    // exit
    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }
  traverseNode(rootNode);
}
