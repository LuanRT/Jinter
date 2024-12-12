import Visitor from './visitor.js';
import { parse } from 'acorn';
import { ExtendNode, JinterError } from './utils/index.js';

import type ESTree from 'estree';
import type { Node } from 'estree';

export default class Jinter {
  #ast: Node[] = [];

  /**
   * The node visitor. This is responsible for walking the AST and executing the nodes.
   */
  public visitor: Visitor;

  /**
   * The global scope of the program.
   */
  public scope: Map<string, any>;

  constructor() {
    this.visitor = new Visitor();
    this.scope = this.visitor.scope;
    this.scope.set('print', (args: any[]) => console.log(...args));
    this.defineObject('console', console);
    this.defineObject('Math', Math);
    this.defineObject('String', String);
    this.defineObject('Number', Number);
    this.defineObject('Array', Array);
    this.defineObject('Date', Date);
  }

  public defineObject<T>(name: string, obj: T) {
    this.visitor.on(name, (node, visitor) => {
      if (node.type === 'Identifier')
        return obj;

      if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const prop: keyof T = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));
        const callable = obj[prop] as Function | undefined;

        if (!callable)
          return '__continue_exec';

        return callable.apply(obj, args);
      }
      return '__continue_exec';
    });
  }

  /**
   * Evaluates the program.
   * @returns The result of the last statement in the program.
   */
  public evaluate(input: string): any {
    const program = Jinter.parseScript(input);
    this.#ast = program.body;

    this.visitor.setAST(this.#ast);

    return this.visitor.run();
  }

  /**
   * Generates an AST from the input.
   */
  public static parseScript(input: string): ExtendNode<ESTree.Program> {
    try {
      return parse(input, { ecmaVersion: 2020 }) as ExtendNode<ESTree.Program>;
    } catch (e: any) {
      const match = e.message.match(/\((\d+):(\d+)\)/);
      if (match) {
        const line = parseInt(match[1], 10);
        const column = parseInt(match[2], 10);
        const lines = input.split('\n');
        const errorLine = lines[line - 1];
        const snippet = errorLine ? errorLine.substring(Math.max(0, column - 10), column + 10) : '';
        throw new JinterError(`${e.message.replace(/\(.*\)/, '').trim()} at line ${line}, column ${column}: ${snippet}`, { errorLine });
      } else {
        throw new JinterError(e.message);
      }
    }
  }
}
