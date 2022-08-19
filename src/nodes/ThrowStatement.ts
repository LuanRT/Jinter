import Visitor from '../visitor';

export default class ThrowStatement {
  static visit(node: any, visitor: Visitor) {
    const arg = visitor.visitNode(node.argument);
    throw arg;
  }
}