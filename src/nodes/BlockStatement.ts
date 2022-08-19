import Visitor from '../visitor';

export default class BlockStatement {
  static visit(node: any, visitor: Visitor) {
    for (const stmt of node.body) {
      const result = visitor.visitNode(stmt);

      if (stmt.type === 'ReturnStatement')
        return result;

      if (result === 'continue')
        return result;
    }
  }
}