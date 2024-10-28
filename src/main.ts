import Visitor from './visitor.js';
import { parse } from 'acorn';
import type { Node } from 'estree';
import { JinterError } from './utils/index.js';

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
      } return '__continue_exec';
    });
  }

  /**
   * Evaluates the program.
   * @returns The result of the last statement in the program.
   */
  public evaluate(input: string) {
    try {
      const program = parse(input, { ecmaVersion: 2020 });
      this.#ast = program.body;
    } catch (e: any) {
      throw new JinterError(e.message);
    }

    this.visitor.setAST(this.#ast);

    return this.visitor.run();
  }

  /**
   * Generates an AST from the input.
   */
  public static parseScript(input: string): import('../acorn.js').ExtendNode<import('estree').Program> {
    try {
      return parse(input, { ecmaVersion: 2020 });
    } catch (e: any) {
      throw new JinterError(e.message);
    }
  }
}
