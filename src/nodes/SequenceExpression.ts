import Visitor from '../visitor';
import type ESTree from 'estree';

export default class SequenceExpression {
  static visit(node: ESTree.SequenceExpression, visitor: Visitor) {
    let result;

    for (const expression of node.expressions) {
      result = visitor.visitNode(expression);
    }

    return result;
  }
}