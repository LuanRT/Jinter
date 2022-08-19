import Visitor from '../visitor';

export default class AssignmentExpression {
  static visit(node: any, visitor: Visitor) {
    const operator = node.operator;

    const right_node = visitor.visitNode(node.right);

    switch (operator) {
      case '=':
        if (node.left.computed) {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] = right_node;
        }
        visitor.scope.set(node.left.name, right_node);
        return visitor.scope.get(node.left.name);

      case '+=':
        visitor.scope.set(node.left.name, visitor.scope.get(node.left.name) + right_node);
        return visitor.scope.get(node.left.name);
      case '-=':
        visitor.scope.set(node.left.name, visitor.scope.get(node.left.name) - right_node);
        return visitor.scope.get(node.left.name);
      default:
        console.warn('Operator not implemented:', operator);
    }
  }
}