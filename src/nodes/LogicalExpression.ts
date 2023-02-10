import Visitor from '../visitor';
import type ESTree from 'estree';

export default class LogicalExpression {
  static visit(node: ESTree.LogicalExpression, visitor: Visitor) {
    const operator: string = node.operator;

    switch (operator) {
      case '&&': {
        const left_side = visitor.visitNode(node.left);
        if (left_side === true)
          return visitor.visitNode(node.right);
        return left_side;
      }
      case '||': {
        const left_side = visitor.visitNode(node.left);
        return left_side || visitor.visitNode(node.right);
      }
      case '??': {
        const left_side = visitor.visitNode(node.left);
        return left_side ?? visitor.visitNode(node.right);
      }
    }
  }
}