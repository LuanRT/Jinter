import type ESTree from 'estree';
import type Visitor from '../visitor.js';
import BaseJSNode from './BaseJSNode.js';

type UnaryOperatorFunction = (
  visitor: Visitor,
  argument: ESTree.Expression | ESTree.Super | ESTree.Pattern
) => any;

export default class UnaryExpression extends BaseJSNode<ESTree.UnaryExpression> {
  private static operatorMap: Record<string, UnaryOperatorFunction> = {
    // Arithmetic operators
    '-': (visitor, argument) => -visitor.visitNode(argument),
    '+': (visitor, argument) => +visitor.visitNode(argument),

    // Logical/Bitwise operators
    '!': (visitor, argument) => !visitor.visitNode(argument),
    '~': (visitor, argument) => ~visitor.visitNode(argument),

    // Type/Value operators
    'void': (visitor, argument) => {
      visitor.visitNode(argument);
      return undefined;
    },
    'typeof': (visitor, argument) => {
      const arg = visitor.visitNode(argument);

      if (argument.type === 'Identifier' && arg === 'undefined')
        return 'undefined';

      return typeof visitor.visitNode(argument);
    },

    // Property/Variable deletion
    'delete': (visitor, argument) => {
      if (argument.type === 'MemberExpression') {
        const obj = visitor.visitNode(argument.object);
        const prop = argument.computed
          ? visitor.visitNode(argument.property)
          : visitor.getName(argument.property);
        return delete obj[prop];
      }

      if (argument.type === 'Identifier' && visitor.scope.has(argument.name)) {
        return visitor.scope.delete(argument.name);
      }

      return true;
    }
  };

  private static isValidOperator(operator: string): operator is keyof typeof UnaryExpression.operatorMap {
    return operator in UnaryExpression.operatorMap;
  }

  public run(): any {
    const { operator, argument } = this.node;

    if (!UnaryExpression.isValidOperator(operator)) {
      console.warn('Unhandled unary operator:', operator);
      return undefined;
    }

    return UnaryExpression.operatorMap[operator](this.visitor, argument);
  }
}