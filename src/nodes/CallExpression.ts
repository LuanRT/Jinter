import type Visitor from '../visitor.js';
import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';
import { JinterError } from '../utils/index.js';

const builtins: { [key: string]: any } = {
  // Override the forEach method so that the "this" arg is set correctly
  forEach: (args: any[], target: any, visitor: Visitor) => {
    const arr = target;

    // Set forEach's “this” arg
    if (args.length > 1) {
      visitor.scope.set('_this', args.slice(-1)[0]);
    }

    // Execute callback function
    let index = 0;

    for (const element of arr) {
      args[0]([ element, index++, arr ]);
    }
  },
  // Also override the toString method so that it stringifies the correct object
  toString: (_args: any[], target: any) => {
    return target.toString();
  }
};

export default class CallExpression extends BaseJSNode<ESTree.CallExpression> {
  public run(): any {
    let exp_object: string | undefined;
    let exp_property: string | undefined;

    if (this.node.callee.type === 'MemberExpression') {
      exp_object = this.visitor.getName(this.node.callee.object);
      exp_property = this.visitor.getName(this.node.callee.property);
    } else if (this.node.callee.type === 'Identifier') {
      exp_property = this.node.callee.name;
    }

    // Obj.fn(...);
    if (exp_object && this.visitor.listeners[exp_object]) {
      const cb = this.visitor.listeners[exp_object](this.node, this.visitor);
      if (cb !== '__continue_exec') {
        return cb;
      }
    }

    // ?.fn(...);
    if (exp_property && exp_property !== 'toString' && this.visitor.listeners[exp_property]) {
      const cb = this.visitor.listeners[exp_property](this.node, this.visitor);
      if (cb !== '__continue_exec') {
        return cb;
      }
    }

    if (this.node.callee.type === 'MemberExpression') {
      const obj = this.visitor.visitNode(this.node.callee.object);
      const prop = this.node.callee.computed ? this.visitor.visitNode(this.node.callee.property) : this.visitor.getName(this.node.callee.property);
      const args = this.node.arguments.map((arg) => this.visitor.visitNode(arg));

      if (prop in builtins) {
        return builtins[prop](args, obj, this.visitor);
      }

      if (!obj)
        this.#throwError();

      if (typeof obj[prop] !== 'function')
        this.#throwError();

      if (obj[prop].toString().includes('[native code]'))
        return obj[prop](...args);

      return obj[prop](args);
    }

    const fn = this.visitor.visitNode(this.node.callee);
    const args = this.node.arguments.map((arg) => this.visitor.visitNode(arg));

    if (typeof fn !== 'function')
      this.#throwError();

    return fn(args);
  }

  #throwError() {
    if (this.node.callee.type === 'MemberExpression' || this.node.callee.type === 'Identifier') {
      const callee_string = this.#getCalleeString(this.node.callee);
      throw new JinterError(`${callee_string} is not a function`);
    } else if (this.node.callee.type === 'SequenceExpression') {
      const call: string[] = [];
      const items: string[] = [];

      call.push('(');
      this.node.callee.expressions.forEach((expr) => {
        if (expr.type === 'Literal') {
          items.push(expr.raw || '');
        } else if (expr.type === 'Identifier') {
          items.push(expr.name);
        } else if (expr.type === 'MemberExpression') {
          if (expr.computed) {
            items.push(`${this.visitor.getName(expr.object)}[${this.visitor.getName(expr.property) || '...'}]`);
          } else {
            items.push(`${this.visitor.getName(expr.object)}.${this.visitor.getName(expr.property)}`);
          }
        }
      });
      call.push(items.join(', '));
      call.push(')');

      throw new JinterError(`${call.join('')} is not a function`);
    }
  }

  #getCalleeString(node: ESTree.MemberExpression | ESTree.Identifier): string {
    if (node.type === 'Identifier') {
      return node.name;
    } else if (node.type === 'MemberExpression') {
      const object_string = this.#getCalleeString(node.object as ESTree.MemberExpression | ESTree.Identifier);
      const property_string = node.computed ? `[${this.visitor.getName(node.property) || '...'}]` : `.${this.visitor.getName(node.property)}`;
      return `${object_string}${property_string}`;
    }
    return '<unknown>';
  }
}