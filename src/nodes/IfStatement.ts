import Visitor from '../visitor';
import type ESTree from 'estree';

export default class IfStatement {
  static visit(node: ESTree.IfStatement, visitor: Visitor) {
    const test = visitor.visitNode(node.test);

    if (test) {
      return visitor.visitNode(node.consequent);
    } else if (node.alternate) {
      return visitor.visitNode(node.alternate);
    }
  }
}