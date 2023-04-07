import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ContinueStatement extends BaseJSNode<ESTree.ContinueStatement> {
  public run() {
    return 'continue';
  }
}