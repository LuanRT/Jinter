import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ConditionalExpression {
  static visit(node: ESTree.ConditionalExpression, visitor: Visitor) {
    const { test, consequent, alternate } = node;

    const check = visitor.visitNode(test);

    if (check) {
      return visitor.visitNode(consequent);
    }

    return visitor.visitNode(alternate);
  }
}