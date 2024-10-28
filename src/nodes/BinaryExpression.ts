import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

type BinaryOperatorFunction = (left: any, right: any) => any;

export default class BinaryExpression extends BaseJSNode<ESTree.BinaryExpression> {
  private static operatorMap: Record<string, BinaryOperatorFunction> = {
    // Comparison operators
    '!=': (left, right) => left != right,
    '!==': (left, right) => left !== right,
    '==': (left, right) => left == right,
    '===': (left, right) => left === right,
    '<': (left, right) => left < right,
    '<=': (left, right) => left <= right,
    '>': (left, right) => left > right,
    '>=': (left, right) => left >= right,

    // Arithmetic operators
    '+': (left, right) => left + right,
    '-': (left, right) => left - right,
    '*': (left, right) => left * right,
    '/': (left, right) => left / right,
    '%': (left, right) => left % right,
    '**': (left, right) => left ** right,

    // Bitwise operators
    '&': (left, right) => left & right,
    '|': (left, right) => left | right,
    '^': (left, right) => left ^ right,
    '<<': (left, right) => left << right,
    '>>': (left, right) => left >> right,
    '>>>': (left, right) => left >>> right,

    // Type checking operators
    'in': (left, right) => left in right,
    'instanceof': (left, right) => left instanceof right
  };

  public run(): any {
    const { operator, left, right } = this.node;

    // Pre-evaluate both nodes.
    const leftValue = this.visitor.visitNode(left);
    const rightValue = this.visitor.visitNode(right);

    const operation = BinaryExpression.operatorMap[operator];
    if (!operation) {
      console.warn('Unhandled binary operator:', operator);
      return undefined;
    }

    return operation(leftValue, rightValue);
  }
}