import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ForStatement extends BaseJSNode<ESTree.ForStatement> {
  public run(): any {
    if (this.node.init) {
      this.visitor.visitNode(this.node.init);
    }

    const test = () => {
      return this.node.test
        ? this.visitor.visitNode(this.node.test)
        : true;
    };

    for (;;) {
      const _test = test();

      if (!_test) {
        break;
      }

      const body = this.visitor.visitNode(this.node.body);

      if (body === '$jintr_continue_') {
        continue;
      }

      if (body === '$jintr_break_') {
        break;
      }

      if (this.node.update) {
        this.visitor.visitNode(this.node.update);
      }

      if (body && this.node.body.type !== 'ExpressionStatement') {
        return body;
      }
    }
  }
}