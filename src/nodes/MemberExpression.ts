import Visitor from '../visitor';

export default class MemberExpression {
  static visit(node: any, visitor: Visitor) {
    const { object, property, computed } = node;

    const obj = visitor.visitNode(object);
    const prop = computed ? visitor.visitNode(property) : property.name;

    // Polyfill for .length
    if (prop === 'length') {
      return obj.length;
    }

    if (visitor.listeners[prop]) {
      const cb = visitor.listeners[prop](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    return obj?.[prop];
  }
}