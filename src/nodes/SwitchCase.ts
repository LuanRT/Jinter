import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class SwitchCase extends BaseJSNode<ESTree.SwitchCase> {
  public run(): any {
    for (const stmt of this.node.consequent) {
      const result = this.visitor.visitNode(stmt);
      if (stmt.type === 'ContinueStatement' || stmt.type === 'BreakStatement') {
        return result;
      }
    }
  }
}