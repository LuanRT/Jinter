import Visitor from '../visitor';
import type ESTree from 'estree';

export default class MemberExpression {
  static visit(node: ESTree.MemberExpression, visitor: Visitor) {
    const { object, property, computed } = node;

    const obj = visitor.visitNode(object);
    const prop = computed ? visitor.visitNode(property) : visitor.getName(property);

    if (prop !== undefined || prop !== null) {
      if (visitor.listeners[prop]) {
        const cb = visitor.listeners[prop](node, visitor);
        if (cb !== 'proceed') {
          return cb;
        }
      }

      return obj?.[prop];
    }
  }
}