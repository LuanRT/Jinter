import Visitor from '../visitor';

export default class SequenceExpression {
  static visit(node: any, visitor: Visitor) {
    let result;

    for (const expression of node.expressions) {
      result = visitor.visitNode(expression);
    }

    return result;
  }
}