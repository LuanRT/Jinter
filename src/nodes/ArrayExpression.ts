import Visitor from '../visitor';

export default class ArrayExpression {
  static visit(node: any, visitor: Visitor) {
    return node.elements.map((el: any) => visitor.visitNode(el));
  }
}