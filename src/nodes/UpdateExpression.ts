import Visitor from '../visitor';

export default class UpdateExpression {
  static visit(node: any, visitor: Visitor) {
    const operator = node.operator;

    const arg = visitor.visitNode(node.argument);

    switch (operator) {
      case '++': {
        if (node.argument.object) {
          const target_node = visitor.visitNode(node.argument.object);
          return target_node[visitor.visitNode(node.argument.property)]++;
        }
        let target_node = visitor.visitNode(node.argument);
        visitor.scope.set(node.argument.name, target_node + 1);
        return node.prefix ? ++target_node : target_node;
      }
      case '--': {
        if (node.argument.object) {
          const target_node = visitor.visitNode(node.argument.object);
          return target_node[visitor.visitNode(node.argument.property)]--;
        }
        let target_node = visitor.visitNode(node.argument);
        visitor.scope.set(node.argument.name, target_node - 1);
        return node.prefix ? --target_node : target_node;
      }
      default:
        console.warn('Unsupported operator: ', operator);
    }
  }
}
