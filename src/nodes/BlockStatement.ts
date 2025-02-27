import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class BlockStatement extends BaseJSNode<ESTree.BlockStatement> {
  public run(): any {
    for (const stmt of this.node.body) {
      const result = this.visitor.visitNode(stmt);

      if (stmt.type === 'ReturnStatement')
        return result;

      if (result === '$jintr_break_' || result === '$jintr_continue_')
        return result;

      if (
        (stmt.type === 'WhileStatement' ||
        stmt.type === 'IfStatement' ||
        stmt.type === 'ForStatement' ||
        stmt.type === 'TryStatement') &&
        !!result
      ) {
        return result;
      }
    }
  }
}