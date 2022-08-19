import Visitor from '../visitor';

export default class SwitchCase {
  static visit(node: any, visitor: Visitor) {
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