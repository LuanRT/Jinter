import Visitor from '../visitor';

export default class LogicalExpression {
  static visit(node: any, visitor: Visitor) {
    const operator: string = node.operator;

    switch (operator) {
      case '&&': {
        const left_side = visitor.visitNode(node.left);
        if (left_side === true)
          return visitor.visitNode(node.right);
        return left_side;
      }
      case '||': {
        const left_side = visitor.visitNode(node.left);
        return left_side || visitor.visitNode(node.right);
      }
      default:
        throw Error(`Unsupported logical operator: ${operator}`);
    }
  }
}