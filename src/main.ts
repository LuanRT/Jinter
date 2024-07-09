import Visitor from './visitor.js';
import { parse } from 'acorn';
import type { Node } from 'estree';

export default class Jinter {
  #ast: Node[];

  /**
   * The node visitor. This is responsible for walking the AST and executing the nodes.
   */
  public visitor: Visitor;


  /**
   * The global scope of the program.
   */
  public scope: Map<string, any>;

  constructor(input: string) {
    const program = parse(input, { ecmaVersion: 2020 });

    this.#ast = program.body;

    this.visitor = new Visitor(this.#ast);
    this.scope = this.visitor.scope;

    this.scope.set('print', (args: any[]) => console.log(...args));

    this.visitor.on('console', (node, visitor) => {
      if (node.type === 'Identifier')
        return console;

      if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const prop: keyof Console = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));

        const console_prop = console[prop] as Function;

        if (!console_prop)
          return 'proceed';

        return console_prop(...args);
      } return 'proceed';
    });

    this.visitor.on('Math', (node, visitor) => {
      if (node.type === 'Identifier')
        return Math;

      if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const prop: keyof Math = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));
        const math_prop = Math[prop] as Function;

        if (!math_prop)
          return 'proceed';

        return math_prop(...(args as [number, number]));
      } return 'proceed';
    });

    this.visitor.on('String', (node, visitor) => {
      if (node.type === 'Identifier')
        return String;

      if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const prop: keyof typeof String = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));
        const string_prop = String[prop] as Function;

        if (!string_prop)
          return 'proceed';

        return string_prop(args);
      } return 'proceed';
    });

    this.visitor.on('Array', (node, visitor) => {
      if (node.type === 'Identifier')
        return Array;

      if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const prop: keyof typeof Array = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));
        const array_prop = Array[prop] as Function;

        if (!array_prop)
          return 'proceed';

        return array_prop(args);
      } return 'proceed';
    });

    this.visitor.on('Date', (node) => {
      if (node.type === 'Identifier')
        return Date;
    });
  }

  /**
   * Interprets the program.
   * @returns The result of the last statement in the program.
   */
  public interpret() {
    return this.visitor.run();
  }
}
