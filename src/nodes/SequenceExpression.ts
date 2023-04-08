import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class SequenceExpression extends BaseJSNode<ESTree.SequenceExpression> {
  public run() {
    let result;

    for (const expression of this.node.expressions) {
      result = this.visitor.visitNode(expression);
    }

    return result;
  }
}