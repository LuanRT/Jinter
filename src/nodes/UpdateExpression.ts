import Visitor from '../visitor';
import type ESTree from 'estree';

export default class UpdateExpression {
  static visit(node: ESTree.UpdateExpression, visitor: Visitor) {
    const operator = node.operator;

    switch (operator) {
      case '++': {
        if (node.argument.type === 'MemberExpression') {
          const target_node = visitor.visitNode(node.argument.object);
          return target_node[visitor.visitNode(node.argument.property)]++;
        } else if (node.argument.type === 'Identifier') {
          let target_node = visitor.visitNode(node.argument);
          visitor.scope.set(node.argument.name, target_node + 1);
          return node.prefix ? ++target_node : target_node;
        }
      }
        break;
      case '--': {
        if (node.argument.type === 'MemberExpression') {
          const target_node = visitor.visitNode(node.argument.object);
          return target_node[visitor.visitNode(node.argument.property)]--;
        } else if (node.argument.type === 'Identifier') {
          let target_node = visitor.visitNode(node.argument);
          visitor.scope.set(node.argument.name, target_node - 1);
          return node.prefix ? --target_node : target_node;
        }
      }
        break;
    }
  }
}
