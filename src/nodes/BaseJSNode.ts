import type ESTree from 'estree';
import Visitor from '../visitor.js';

export default class BaseJSNode<T extends ESTree.BaseNode = ESTree.BaseNode> {
  public node: T;
  public visitor: Visitor;

  constructor(node: T, visitor: Visitor) {
    this.node = node;
    this.visitor = visitor;
  }

  run(): any { /* Placeholder */ }
}