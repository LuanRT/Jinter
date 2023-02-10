import Visitor from '../visitor';
import type EsTree from 'estree';

export default class Literal {
  static visit(node: EsTree.Literal, _visitor: Visitor) {
    return node.value;
  }
}