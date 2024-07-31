import * as ESTree from 'estree';
import acorn from 'acorn';

type ExtendNode<T> = {
  [K in keyof T]: T[K] extends object ? ExtendNode<T[K]> : T[K];
} & (T extends ESTree.Node
  ? {
    start: number;
    end: number;
  }
  : unknown);

declare module 'acorn' {
  export function parse(s: string, o: acorn.Options): ExtendNode<ESTree.Program>;
}
