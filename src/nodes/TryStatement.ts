import Visitor from '../visitor';

export default class TryStatement {
  static visit(node: any, visitor: Visitor) {
    try {
      return visitor.visitNode(node.block);
    } catch (e) {
      visitor.scope.set(node.handler.param.name, e);
      return visitor.visitNode(node.handler.body);
    } finally {
      visitor.visitNode(node.finalizer);
    }
  }
}