import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';
import type Visitor from '../visitor.js';

type LogicalOperatorFunction = (
  visitor: Visitor,
  leftNode: ESTree.Expression,
  rightNode: ESTree.Expression
) => any;

export default class LogicalExpression extends BaseJSNode<ESTree.LogicalExpression> {
  private static operatorMap: Record<string, LogicalOperatorFunction> = {
    '&&': (visitor, leftNode, rightNode) => {
      const leftValue = visitor.visitNode(leftNode);
      return leftValue === true ? visitor.visitNode(rightNode) : leftValue;
    },

    '||': (visitor, leftNode, rightNode) => {
      const leftValue = visitor.visitNode(leftNode);
      return leftValue || visitor.visitNode(rightNode);
    },

    '??': (visitor, leftNode, rightNode) => {
      const normalizeUndefined = (value: any, isIdentifier: boolean) =>
        isIdentifier && value === 'undefined' ? undefined : value;

      const leftValue = normalizeUndefined(visitor.visitNode(leftNode), leftNode.type === 'Identifier');
      const rightValue = normalizeUndefined(visitor.visitNode(rightNode), rightNode.type === 'Identifier');

      return leftValue ?? rightValue;
    }
  };

  public run() {
    const { operator, left, right } = this.node;

    const operation = LogicalExpression.operatorMap[operator];
    if (!operation) {
      console.warn('Unhandled logical operator:', operator);
      return undefined;
    }

    return operation(this.visitor, left, right);
  }
}