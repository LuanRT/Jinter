import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ObjectExpression extends BaseJSNode<ESTree.ObjectExpression> {
  public run(): any {
    let result: { [key: string]: any } = {};

    for (const prop of this.node.properties) {
      if (prop.type === 'Property') {
        result = { ...result, ...this.visitor.visitNode(prop) };
      } else {
        throw new Error(`Unhandled property type: ${prop.type}`);
      }
    }

    return result;
  }
}