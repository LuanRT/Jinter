import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class BreakStatement extends BaseJSNode<ESTree.BreakStatement> {
  public run() {
    // @TODO: Parse label
    return 'break';
  }
}