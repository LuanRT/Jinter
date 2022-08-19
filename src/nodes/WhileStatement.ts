import Visitor from '../visitor';

export default class WhileStatement {
  static visit(node: any, visitor: Visitor) {
    while (visitor.visitNode(node.test)) {
      const body = visitor.visitNode(node.body);

      if (body === 'break')
        break;

      if (body === 'continue')
        continue;

      if (body)
        return body;
    }
  }
}