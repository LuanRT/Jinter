import Visitor from '../visitor';
import type ESTree from 'estree';

export default class TryStatement {
  static visit(node: ESTree.TryStatement, visitor: Visitor) {
    try {
      return visitor.visitNode(node.block);
    } catch (e) {
      if (node.handler) {
        if (node.handler.param && node.handler.param.type === 'Identifier') {
          visitor.scope.set(node.handler.param.name, e);
        }
        return visitor.visitNode(node.handler.body);
      }
    } finally {
      visitor.visitNode(node.finalizer);
    }
  }
}