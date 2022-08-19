import Visitor from '../visitor';

export default class ThisExpression {
  static visit(node: any, visitor: Visitor) {
    return visitor.scope.get('_this');
  }
}