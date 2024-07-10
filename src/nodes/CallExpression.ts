import type Visitor from '../visitor.js';
import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';
import { JinterError } from '../utils/index.js';

export default class CallExpression extends BaseJSNode<ESTree.CallExpression> {
  public run() {
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
      if (Builtins.has(this.node, this.visitor)) {
        return Builtins.execute(this.node, this.visitor);
      }

      const obj = this.visitor.visitNode(this.node.callee.object);
      const prop = this.node.callee.computed ? this.visitor.visitNode(this.node.callee.property) : this.visitor.getName(this.node.callee.property);
      const args = this.node.arguments.map((arg) => this.visitor.visitNode(arg));

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

class Builtins {
  static builtins: { [key: string]: any } = {
    // Override the forEach method so that the "this" arg is set correctly
    forEach: (node: ESTree.CallExpression, visitor: Visitor) => {
      const args = node.arguments.map((arg) => visitor.visitNode(arg));

      if (node.callee.type === 'MemberExpression') {
        const arr = visitor.visitNode(node.callee.object);

        // Set forEach's “this” arg
        if (args.length > 1) {
          visitor.scope.set('_this', args.slice(-1)[0]);
        }

        // Execute callback function
        let index = 0;

        for (const element of arr) {
          args[0]([ element, index++, arr ]);
        }
      } else {
        console.warn('Unhandled callee type:', node.callee.type);
      }
    },
    // Also override the toString method so that it stringifies the correct object
    toString: (node: ESTree.CallExpression, visitor: Visitor) => {
      if (node.callee.type === 'MemberExpression') {
        return visitor.visitNode(node.callee.object).toString();
      }
    }
  };

  static has(node: ESTree.CallExpression, visitor: Visitor): boolean {
    if (node.callee.type === 'MemberExpression') {
      return !!this.builtins?.[visitor.getName(node.callee.property) || ''];
    }
    return false;
  }

  static execute(node: ESTree.CallExpression, visitor: Visitor) {
    if (node.callee.type === 'MemberExpression') {
      return this.builtins[visitor.getName(node.callee.property) || ''](node, visitor);
    }
  }
}