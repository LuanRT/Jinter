import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class MemberExpression extends BaseJSNode<ESTree.MemberExpression> {
  public run() {
    const { object, property, computed } = this.node;

    const obj = this.visitor.visitNode(object);
    const prop = computed ? this.visitor.visitNode(property) : this.visitor.getName(property);

    if (prop !== undefined || prop !== null) {
      if (this.visitor.listeners[prop]) {
        const cb = this.visitor.listeners[prop](this.node, this.visitor);
        if (cb !== '__continue_exec') {
          return cb;
        }
      }

      return obj?.[prop];
    }
  }
}