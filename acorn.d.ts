import * as ESTree from 'estree';

declare module 'acorn' {
  export function parse(s: string, o: Options): ESTree.Program;

  // fix type of Comment property 'type'
  export type AcornComment = Omit<Comment, 'type'> & {
    type: 'Line' | 'Block';
  };
}

declare module 'estree' {
  interface BaseNodeWithoutComments {
    start: number;
    end: number;
  }
}