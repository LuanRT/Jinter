import Visitor from '../visitor';

export default class CallExpression {
  static visit(node: any, visitor: Visitor) {
    const obj_name = node.callee.object?.name;
    const fn_name = node.callee.name || node.callee.property?.name;

    // Obj.fn(...);
    if (visitor.listeners[obj_name]) {
      const cb = visitor.listeners[obj_name](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    // ?.fn(...);
    if (visitor.listeners[fn_name]) {
      const cb = visitor.listeners[fn_name](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    switch (fn_name) {
      case 'print': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        console.log(...args);
        return;
      }
      case 'push': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const obj = visitor.visitNode(node.callee.object);
        for (const arg of args) obj.push(arg);
        return;
      }
      case 'join': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const arr = visitor.visitNode(node.callee.object);
        return arr.join(args?.[0] || '');
      }
      case 'splice': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const arr = visitor.visitNode(node.callee.object);
        return arr.splice(...args);
      }
      case 'reverse': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const arr = visitor.visitNode(node.callee.object);
        return arr.reverse();
      }
      case 'unshift': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const arr = visitor.visitNode(node.callee.object);
        return arr.unshift(...args);
      }
      case 'split': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const obj = visitor.visitNode(node.callee.object);
        return obj.split(...args);
      }
      case 'indexOf': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const obj = visitor.visitNode(node.callee.object);
        return obj.indexOf(...args);
      }
      case 'pop': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
        const arr = visitor.visitNode(node.callee.object);
        return arr.pop();
      }
      case 'forEach': {
        const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
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

        return;
      }
      default:
    }

    const callee = visitor.visitNode(node.callee);

    if (typeof callee !== 'function') {
      if (node.callee.object) {
        throw new Error(
          `${visitor.visitNode(node.callee.object)}.${
            visitor.visitNode(node.callee.property)}(...) is not a function`
        );
      }

      throw new Error(`${callee} is not a function`);
    } else {
      const args = node.arguments.map((arg: any) => visitor.visitNode(arg));

      if (callee.toString().includes('[native code]')) {
        const obj = visitor.visitNode(node.callee.object);
        return obj[node.callee.property.name]();
      }

      return callee(args);
    }
  }
}