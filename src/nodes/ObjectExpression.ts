import Visitor from '../visitor';
import type ESTree from 'estree';

export default class ObjectExpression {
  static visit(node: ESTree.ObjectExpression, visitor: Visitor) {
    let result: { [key: string]: any } = {};

    for (const prop of node.properties) {
      if (prop.type === 'Property') {
        result = { ...result, ...visitor.visitNode(prop) };
      } else {
        throw new Error(`Unhandled property type: ${prop.type}`);
      }
    }

    return result;
  }
}