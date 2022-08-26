import Visitor from '../visitor';

export default class Identifier {
  static visit(node: any, visitor: Visitor) {
    if (visitor.listeners[node.name]) {
      const cb = visitor.listeners[node.name](node, visitor);
      if (cb !== 'proceed') {
        return cb;
      }
    }

    if (visitor.scope.has(node.name))
      return visitor.scope.get(node.name);

    return node.name;
  }
}