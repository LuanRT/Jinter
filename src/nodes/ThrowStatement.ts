import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ThrowStatement {
  static visit(node: ESTree.ThrowStatement, visitor: Visitor) {
    const arg = visitor.visitNode(node.argument);
    throw arg;
  }
}