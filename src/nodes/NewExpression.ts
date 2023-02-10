import Visitor from '../visitor';
import type ESTree from 'estree';

export default class NewExpression {
  static visit(node: ESTree.NewExpression, visitor: Visitor) {
    const callee = visitor.visitNode(node.callee);
    const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
    return new callee(args);
  }
}