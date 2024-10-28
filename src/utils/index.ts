import acorn from 'acorn';
import type ESTree from 'estree';
import BaseJSNode from '../nodes/BaseJSNode.js';
import Visitor from '../visitor.js';

export type ExtendNode<T> = {
  [K in keyof T]: T[K] extends object ? ExtendNode<T[K]> : T[K];
} & (T extends ESTree.Node
  ? {
    start: number;
    end: number;
  }
  : unknown);

export const namedFunction: (name: string, fn: Function) => Function = (name: string, fn: Function) => Object.defineProperty(fn, 'name', { value: name });

export interface JSNode<T extends BaseJSNode> extends BaseJSNode {
  run(): ReturnType<T['run']>;
}

export interface JSNodeConstructor<T extends BaseJSNode> {
  new(node: ESTree.Node, visitor: Visitor): JSNode<T>;
}

export class JinterError extends Error {
  info?: any;

  constructor(message: string, info?: any) {
    super(message);

    if (info) {
      this.info = info;
    }
  }
}