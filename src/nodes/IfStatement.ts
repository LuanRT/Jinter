import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class IfStatement extends BaseJSNode<ESTree.IfStatement> {
  public run() {
    const test = this.visitor.visitNode(this.node.test);

    if (test) {
      return this.visitor.visitNode(this.node.consequent);
    } else if (this.node.alternate) {
      return this.visitor.visitNode(this.node.alternate);
    }
  }
}