import Visitor from '../visitor';

export default class ContinueStatement {
  static visit(node: any, visitor: Visitor) {
    return 'continue';
  }
}