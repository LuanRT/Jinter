import Visitor from '../visitor';
import type ESTree from 'estree';

export default class BinaryExpression {
  static visit(node: ESTree.BinaryExpression, visitor: Visitor) {
    const operator = node.operator;

    const left_node = visitor.visitNode(node.left);
    const right_node = visitor.visitNode(node.right);

    switch (operator) {
      case '!=':
        return left_node != right_node;
      case '!==':
        return left_node !== right_node;
      case '%':
        return left_node % right_node;
      case '&':
        return left_node & right_node;
      case '*':
        return left_node * right_node;
      case '**':
        return left_node ** right_node;
      case '+':
        return left_node + right_node;
      case '-':
        return left_node - right_node;
      case '/':
        return left_node / right_node;
      case '<':
        return left_node < right_node;
      case '<<':
        return left_node << right_node;
      case '<=':
        return left_node <= right_node;
      case '==':
        return left_node == right_node;
      case '===':
        return left_node === right_node;
      case '>':
        return left_node > right_node;
      case '>=':
        return left_node >= right_node;
      case '>>':
        return left_node >> right_node;
      case '>>>':
        return left_node >>> right_node;
      case '^':
        return left_node ^ right_node;
      case '|' :
        return left_node | right_node;
      case 'in':
        return left_node in right_node;
      case 'instanceof':
        return left_node instanceof right_node;
    }
  }
}
