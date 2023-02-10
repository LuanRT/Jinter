import Visitor from '../visitor';
import type ESTree from 'estree';
import { namedFunction } from '../utils';

export default class FunctionExpression {
  static visit(node: ESTree.FunctionExpression, visitor: Visitor) {
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