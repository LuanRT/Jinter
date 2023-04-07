import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class LogicalExpression extends BaseJSNode<ESTree.LogicalExpression> {
  public run() {
    const operator: string = this.node.operator;

    switch (operator) {
      case '&&': {
        const left_side = this.visitor.visitNode(this.node.left);
        if (left_side === true)
          return this.visitor.visitNode(this.node.right);
        return left_side;
      }
      case '||': {
        const left_side = this.visitor.visitNode(this.node.left);
        return left_side || this.visitor.visitNode(this.node.right);
      }
      case '??': {
        const left_side = this.visitor.visitNode(this.node.left);
        return left_side ?? this.visitor.visitNode(this.node.right);
      }
    }
  }
}