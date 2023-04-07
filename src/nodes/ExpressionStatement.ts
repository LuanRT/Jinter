import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ExpressionStatement extends BaseJSNode<ESTree.ExpressionStatement>{
  public run() {
    return this.visitor.visitNode(this.node.expression);
  }
}