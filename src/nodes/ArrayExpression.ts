import type ESTree from 'estree';
import BaseNode from './BaseJSNode.js';

export default class ArrayExpression extends BaseNode<ESTree.ArrayExpression> {
  public run(): any {
    return this.node.elements.map((el) => this.visitor.visitNode(el));
  }
}