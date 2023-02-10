import Visitor from '../visitor';
import type ESTree from 'estree';

export default class UnaryExpression {
  static visit(node: ESTree.UnaryExpression, visitor: Visitor) {
    const operator = node.operator;

    switch (operator) {
      case '-': {
        const arg = visitor.visitNode(node.argument);
        return -arg;
      }
      case '+': {
        const arg = visitor.visitNode(node.argument);
        return +arg;
      }
      case '!': {
        const arg = visitor.visitNode(node.argument);
        return !arg;
      }
      case '~': {
        const arg = visitor.visitNode(node.argument);
        return ~arg;
      }
      case 'void': {
        visitor.visitNode(node.argument);
        return undefined;
      }
      case 'typeof': {
        const arg = visitor.visitNode(node.argument);
        return typeof arg;
      }
      case 'delete': {
        if (node.argument.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.argument.object);
          const prop = node.argument.computed ? visitor.visitNode(node.argument.property) : visitor.getName(node.argument.property);
          return delete obj[prop];
        } else if (node.argument.type === 'Identifier') {
          return visitor.scope.delete(node.argument.name);
        }
        return true;
      }
      default:
        console.warn('Unhandled UnaryExpression operator', operator);
    }
  }
}
