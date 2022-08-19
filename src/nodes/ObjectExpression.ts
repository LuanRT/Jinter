import Visitor from '../visitor';

export default class ObjectExpression {
  static visit(node: any, visitor: Visitor) {
    const result: { [key: string]: any } = {};

    for (const prop of node.properties) {
      const key: string = visitor.visitNode(prop.key);
      const value = visitor.visitNode(prop.value);
      result[key] = value;
    }

    return result;
  }
}