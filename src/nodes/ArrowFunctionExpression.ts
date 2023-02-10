import Visitor from '../visitor';
import type ESTree from 'estree';
import { namedFunction } from '../utils';

export default class ArrowFunctionExpression {
  static visit(node: ESTree.ArrowFunctionExpression, visitor: Visitor) {
    const { params, body } = node;

    // @TODO: Handle other types of params and pass them directly to next node instead of saving them in the global scope
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