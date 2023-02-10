import Visitor from '../visitor';
import type ESTree from 'estree';

export default class WhileStatement {
  static visit(node: ESTree.WhileStatement, visitor: Visitor) {
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