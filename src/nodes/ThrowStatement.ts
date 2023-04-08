import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ThrowStatement extends BaseJSNode<ESTree.ThrowStatement> {
  public run() {
    const arg = this.visitor.visitNode(this.node.argument);
    throw arg;
  }
}