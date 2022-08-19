import Visitor from '../visitor';

export default class ReturnStatement {
  static visit(node: any, visitor: Visitor) {
    return visitor.visitNode(node.argument);
  }
}