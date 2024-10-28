import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

type OperatorFunction = (left: any, right: any) => any;

export default class AssignmentExpression extends BaseJSNode<ESTree.AssignmentExpression> {
  private static operatorMap: Record<string, OperatorFunction> = {
    '=': (_, right) => right,
    '+=': (left, right) => left + right,
    '-=': (left, right) => left - right,
    '*=': (left, right) => left * right,
    '/=': (left, right) => left / right,
    '%=': (left, right) => left % right,
    '**=': (left, right) => left ** right,
    '<<=': (left, right) => left << right,
    '>>=': (left, right) => left >> right,
    '>>>=': (left, right) => left >>> right,
    '&=': (left, right) => left & right,
    '^=': (left, right) => left ^ right,
    '|=': (left, right) => left | right
  };

  private handleMemberExpression(
    leftNode: ESTree.MemberExpression,
    rightValue: any,
    operation: OperatorFunction
  ) {
    const obj = this.visitor.visitNode(leftNode.object);
    const prop = this.visitor.visitNode(leftNode.property);
    const currentValue = obj[prop];
    const newValue = operation(currentValue, rightValue);
    return (obj[prop] = newValue);
  }

  private handleIdentifier(
    leftNode: ESTree.Identifier,
    rightValue: any,
    operation: OperatorFunction
  ) {
    const currentValue = this.visitor.visitNode(leftNode);
    const newValue = operation(currentValue, rightValue);
    this.visitor.scope.set(leftNode.name, newValue);
    return this.visitor.scope.get(leftNode.name);
  }

  public run() {
    const { operator, left, right } = this.node;
    const rightValue = this.visitor.visitNode(right);

    const operation = AssignmentExpression.operatorMap[operator];
    if (!operation) {
      console.warn('Unhandled operator:', operator);
      return undefined;
    }

    if (left.type === 'MemberExpression') {
      return this.handleMemberExpression(left, rightValue, operation);
    } else if (left.type === 'Identifier') {
      return this.handleIdentifier(left, rightValue, operation);
    }

    console.warn('Unhandled left node type:', left.type);
    return undefined;
  }
}