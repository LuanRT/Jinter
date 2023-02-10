import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ContinueStatement {
  static visit(_node: ESTree.ContinueStatement, _visitor: Visitor) {
    return 'continue';
  }
}