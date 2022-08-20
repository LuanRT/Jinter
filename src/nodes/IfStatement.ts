import Visitor from '../visitor';

export default class IfStatement {
  static visit(node: any, visitor: Visitor) {
    if (visitor.visitNode(node.test)) {
      const consequent = visitor.visitNode(node.consequent);
      return consequent;
    }

    if (node.alternate) {
      const alternate = visitor.visitNode(node.alternate);
      return alternate;
    }
  }
}