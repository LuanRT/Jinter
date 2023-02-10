import Visitor from '../visitor';
import type ESTree from 'estree';

export default class AssignmentExpression {
  static visit(node: ESTree.AssignmentExpression, visitor: Visitor) {
    const operator = node.operator;

    const right_node = visitor.visitNode(node.right);

    switch (operator) {
      case '=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] = right_node;
        } else if (node.left.type === 'Identifier') {
          visitor.scope.set(node.left.name, right_node);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '+=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] += right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) + right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '-=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] -= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) - right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '*=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] *= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) * right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '/=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] /= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) / right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '%=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] %= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) % right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '**=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] **= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) ** right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '<<=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] <<= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) << right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '>>=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] >>= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) >> right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '>>>=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] >>>= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) >>> right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
      case '&=':
        if (node.left.type === 'MemberExpression') {
          const obj = visitor.visitNode(node.left.object);
          const prop = visitor.visitNode(node.left.property);
          return obj[prop] &= right_node;
        } else if (node.left.type === 'Identifier') {
          const result = visitor.visitNode(node.left) & right_node;
          visitor.scope.set(node.left.name, result);
          return visitor.scope.get(node.left.name);
        }
        console.warn('Unhandled left node', node.left);
        break;
    }
  }
}