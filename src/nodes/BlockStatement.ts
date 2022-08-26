import Visitor from '../visitor';

export default class BlockStatement {
  static visit(node: any, visitor: Visitor) {
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