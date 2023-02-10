import Visitor from '../visitor';
import type ESTree from 'estree';

export default class VariableDeclaration {
  static visit(node: ESTree.VariableDeclaration, visitor: Visitor) {
    // @TODO: Parse kind
    node.declarations.forEach((declar) => {
      const { id, init } = declar;

      const key = visitor.getName(id);

      const value = init
        ? visitor.visitNode(init)
        : undefined;

      if (key)
        visitor.scope.set(key, value);

      if (typeof value === 'object' && value !== null)
        visitor.scope.set('_this', value);
    });
  }
}