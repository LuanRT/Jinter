import Visitor from '../visitor';

export default class LogicalExpression {
  static visit(node: any, visitor: Visitor) {
    const operator: string = node.operator;

    if (node.operator !== '&&' && node.operator !== '||')
      throw Error(`Unsupported logical operator: ${operator}`);

    switch (operator) {
      case '&&': {
        const left_side = visitor.visitNode(node.left);
        return left_side && visitor.visitNode(node.right);
      }
      case '||': {
        const left_side = visitor.visitNode(node.left);
        return left_side || visitor.visitNode(node.right);
      }
    }
  }
}