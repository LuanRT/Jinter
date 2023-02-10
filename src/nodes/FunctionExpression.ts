import Visitor from '../visitor';
import type ESTree from 'estree';

export default class FunctionExpression {
  static visit(node: ESTree.FunctionExpression, visitor: Visitor) {
    const namedFunction = (name: string, fn: Function) => Object.defineProperty(fn, 'name', { value: name });

    const { params, body } = node;

    const fn = namedFunction('anonymous function', (args: any[]) => {
      let index = 0;

      for (const param of params) {
        visitor.visitNode(param);

        if (param.type === 'Identifier') {
          visitor.scope.set(param.name, args[index]);
        } else {
          console.warn('Unhandled param type', param.type);
        }

        index++;
      }

      return visitor.visitNode(body);
    });

    return fn;
  }
}