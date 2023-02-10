import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ExpressionStatement {
  static visit(node: ESTree.ExpressionStatement, visitor: Visitor) {
    return visitor.visitNode(node.expression);
  }
}