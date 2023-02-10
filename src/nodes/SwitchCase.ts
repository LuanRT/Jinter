import Visitor from '../visitor';
import type ESTree from 'estree';

export default class SwitchCase {
  static visit(node: ESTree.SwitchCase, visitor: Visitor) {
    for (const stmt of node.consequent) {
      const result = visitor.visitNode(stmt);
      if (stmt.type === 'ContinueStatement') {
        return result;
      } else if (stmt.type === 'BreakStatement') {
        return result;
      }
    }
  }
}