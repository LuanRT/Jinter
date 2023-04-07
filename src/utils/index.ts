import ESTree from 'estree';
import BaseJSNode from '../nodes/BaseJSNode.js';
import Visitor from '../visitor.js';

export const namedFunction = (name: string, fn: Function) => Object.defineProperty(fn, 'name', { value: name });

export interface JSNodeConstructor<T extends BaseJSNode = BaseJSNode> {
  new(node: ESTree.Node, visitor: Visitor): T;
}