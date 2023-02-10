import Visitor from '../visitor';
import type ESTree from 'estree';

export default class CallExpression {
  static visit(node: ESTree.CallExpression, visitor: Visitor) {
    let exp_object: string | undefined;
    let exp_property: string | undefined;

    if (node.callee.type === 'MemberExpression') {
      exp_object = visitor.getName(node.callee.object);
      exp_property = visitor.getName(node.callee.property);
    } else if (node.callee.type === 'Identifier') {
      exp_property = node.callee.name;
    }

    // Obj.fn(...);
    if (exp_object && visitor.listeners[exp_object]) {
      const cb = visitor.listeners[exp_object](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    // ?.fn(...);
    if (exp_property && exp_property !== 'toString' && visitor.listeners[exp_property]) {
      const cb = visitor.listeners[exp_property](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    if (node.callee.type === 'MemberExpression') {
      if (Builtins.has(node, visitor)) {
        return Builtins.execute(node, visitor);
      }
      const obj = visitor.visitNode(node.callee.object);
      const prop = node.callee.computed ? visitor.visitNode(node.callee.property) : visitor.getName(node.callee.property);
      const args = node.arguments.map((arg) => visitor.visitNode(arg));

      if (typeof obj[prop] !== 'function')
        this.#throwError(node, visitor);

      if (obj[prop].toString().includes('[native code]'))
        return obj[prop](...args);
      
      return obj[prop](args);
    }

    const fn = visitor.visitNode(node.callee);
    const args = node.arguments.map((arg) => visitor.visitNode(arg));

    if (typeof fn !== 'function')
      this.#throwError(node, visitor);

    return fn(args);
  }

  static #throwError(node: ESTree.CallExpression, visitor: Visitor) {
    if (node.callee.type === 'MemberExpression') {
      throw new Error(`${node.callee.object.type === 'Identifier' ? node.callee.object.name : '<object>'}.${node.callee.property.type === 'Identifier' ? node.callee.property.name : '?'} is not a function`);
    } else if (node.callee.type === 'Identifier') {
      throw new Error(`${node.callee.name} is not a function`);
    } else if (node.callee.type === 'SequenceExpression') {
      const call: string[] = [];
      const items: string[] = [];

      call.push('(');
      node.callee.expressions.forEach((expr) => {
        if (expr.type === 'Literal') {
          items.push(expr.raw || '');
        } else if (expr.type === 'Identifier') {
          items.push(expr.name);
        } else if (expr.type === 'MemberExpression') {
          if (expr.computed) {
            items.push(`${visitor.getName(expr.object)}[${visitor.getName(expr.property) || '...'}]`);
          } else {
            items.push(`${visitor.getName(expr.object)}.${visitor.getName(expr.property)}`);
          }
        }
      });
      call.push(items.join(', '));
      call.push(')');

      throw new Error(`${call.join('')} is not a function`);
    }
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