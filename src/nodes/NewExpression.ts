import Visitor from '../visitor';

export default class NewExpression {
  static visit(node: any, visitor: Visitor) {
    const callee = visitor.visitNode(node.callee);
    const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
    return new callee(args);
  }
}