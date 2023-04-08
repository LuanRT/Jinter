import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class Property extends BaseJSNode<ESTree.Property> {
  public run() {
    switch (this.node.kind) {
      case 'init':
        return this.#init();
      case 'get':
        return this.#get();
      case 'set':
        return this.#set();
      default:
        throw new Error(`Unhandled property kind: ${this.node.kind}`);
    }
  }

  #init() {
    const key = this.node.computed ? this.visitor.visitNode(this.node.key) : this.visitor.getName(this.node.key);
    const value = this.visitor.visitNode(this.node.value);

    if (key) {
      return { [key]: value };
    }
  }

  #get() {
    throw new TypeError('Not implemented: Property.get');
  }

  #set() {
    throw new TypeError('Not implemented: Property.set');
  }
}