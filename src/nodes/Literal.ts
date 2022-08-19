import Visitor from '../visitor';

export default class Literal {
  static visit(node: any, visitor: Visitor) {
    return node.value;
  }
}