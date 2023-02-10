import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ReturnStatement {
  static visit(node: ESTree.ReturnStatement, visitor: Visitor) {
    if (node.argument)
      return visitor.visitNode(node.argument);
  }
}