import Visitor from '../visitor';

export default class FunctionDeclaration {
  static visit(node: any, visitor: Visitor) {
    const nameFunction = (name: string, fn: any) => Object.defineProperty(fn, 'name', { value: name });

    const { params, body } = node;

    const id = visitor.visitNode(node.id);

    const fn = nameFunction(id, (args: any[]) => {
      for (let i = 0; i < params.length; i++) {
        const param_node = visitor.visitNode(params[i]);
        visitor.scope.set(params[i].name, args[i]);
      }

      return visitor.visitNode(body);
    });

    visitor.scope.set(id, fn);
  }
}