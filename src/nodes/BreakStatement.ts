import Visitor from '../visitor';
import type ESTree from 'estree';

export default class BreakStatement {
  static visit(_node: ESTree.BreakStatement, _visitor: Visitor) {
    // @TODO: Parse label
    return 'break';
  }
}