import Visitor from '../visitor';

export default class ForStatement {
  static visit(node: any, visitor: Visitor) {
    if (node.init) {
      visitor.visitNode(node.init);
    }

    const test = () => {
      return node.test
        ? visitor.visitNode(node.test)
        : true;
    };

    for (;;) {
      const _test = test();

      if (!_test) {
        break;
      }

      const body = visitor.visitNode(node.body);

      if (body === 'continue') {
        continue;
      }

      if (body === 'break') {
        break;
      }

      if (node.update) {
        visitor.visitNode(node.update);
      }

      if (body)
        return body;
    }
  }
}