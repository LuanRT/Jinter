import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ThisExpression {
  static visit(_node: ESTree.ThisExpression, visitor: Visitor) {
    return visitor.scope.get('_this');
  }
}