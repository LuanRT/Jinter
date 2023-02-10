import Visitor from '../visitor';
import type ESTree from 'estree';

export default class BlockStatement {
  static visit(node: ESTree.BlockStatement, visitor: Visitor) {
    for (const stmt of node.body) {
      const result = visitor.visitNode(stmt);

      if (stmt.type === 'ReturnStatement')
        return result;

      if (result === 'break' || result === 'continue')
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