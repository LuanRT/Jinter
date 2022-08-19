import Visitor from '../visitor';

export default class VariableDeclaration {
  static visit(node: any, visitor: Visitor) {
    node.declarations.forEach((declar: any) => {
      const { id, init } = declar;
      const key = id.name;

      const value = init
        ? visitor.visitNode(init)
        : undefined;

      visitor.scope.set(key, value);
    });
  }
}