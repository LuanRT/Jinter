import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class BreakStatement extends BaseJSNode<ESTree.BreakStatement> {
  public run(): any {
    // @TODO: Parse label
    return '$jintr_break_';
  }
}