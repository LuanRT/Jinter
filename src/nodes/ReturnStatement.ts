import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ReturnStatement extends BaseJSNode<ESTree.ReturnStatement> {
  public run(): any {
    if (this.node.argument) {
      return this.visitor.visitNode(this.node.argument);
    }
  }
}