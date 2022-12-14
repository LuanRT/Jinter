import Visitor from '../visitor';

export default class ExpressionStatement {
  static visit(node: any, visitor: Visitor) {
    return visitor.visitNode(node.expression);
  }
}