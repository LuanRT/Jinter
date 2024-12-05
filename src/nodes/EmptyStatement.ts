import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class EmptyStatement extends BaseJSNode<ESTree.ContinueStatement> {
  public run(): any {
    return undefined;
  }
}