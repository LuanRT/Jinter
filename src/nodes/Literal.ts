import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class Literal extends BaseJSNode<ESTree.Literal> {
  public run(): any {
    return this.node.value;
  }
}