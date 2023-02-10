import Visitor from '../visitor';
import type ESTree from 'estree';

export default class Property {
  static init(node: ESTree.Property, visitor: Visitor) {
    const key = node.computed ? visitor.visitNode(node.key) : visitor.getName(node.key);
    const value = visitor.visitNode(node.value);

    if (key) {
      return { [key]: value };
    }
  }

  static get(_node: ESTree.Property, _visitor: Visitor) {
    throw new TypeError('Not implemented: Property.get');
  }

  static set(_node: ESTree.Property, _visitor: Visitor) {
    throw new TypeError('Not implemented: Property.set');
  }

  static visit(node: ESTree.Property, visitor: Visitor) {
    switch (node.kind) {
      case 'init':
        return this.init(node, visitor);
      case 'get':
        return this.get(node, visitor);
      case 'set':
        return this.set(node, visitor);
      default:
        throw new Error(`Unhandled property kind: ${node.kind}`);
    }
  }
}