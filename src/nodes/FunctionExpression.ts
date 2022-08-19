import Visitor from '../visitor';

export default class FunctionExpression {
  static visit(node: any, visitor: Visitor) {
    const nameFunction = (name: string, fn: any) => Object.defineProperty(fn, 'name', { value: name });

    const { params, body } = node;

    const fn = nameFunction('anonymous function', (args: any[]) => {
      for (let i = 0; i < params.length; i++) {
        const param_node = visitor.visitNode(params[i]);
        visitor.scope.set(params[i].name, args[i]);
      }
      return visitor.visitNode(body);
    });

    return fn;
  }
}