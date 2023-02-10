import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ArrayExpression {
  static visit(node: ESTree.ArrayExpression, visitor: Visitor) {
    return node.elements.map((el) => visitor.visitNode(el));
  }
}