import Visitor from '../visitor';

export default class UnaryExpression {
  static visit(node: any, visitor: Visitor) {
    const operator = node.operator;

    switch (operator) {
      case '-': {
        const arg = visitor.visitNode(node.argument);
        return -arg;
      }
      case 'void': {
        visitor.visitNode(node.argument);
        return undefined;
      }
      case 'typeof': {
        const arg = visitor.visitNode(node.argument);
        return typeof arg;
      }
      default:
        console.warn('Unsupported operator: ', operator);
    }
  }
}
