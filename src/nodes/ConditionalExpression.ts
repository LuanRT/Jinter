import Visitor from '../visitor';

export default class ConditionalExpression {
  static visit(node: any, visitor: Visitor) {
    const { test, consequent, alternate } = node;

    const operator = test.operator;

    const check = visitor.visitNode(test);

    if (check) {
      return visitor.visitNode(consequent);
    }

    return visitor.visitNode(alternate);
  }
}