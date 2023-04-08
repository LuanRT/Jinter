import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class WhileStatement extends BaseJSNode<ESTree.WhileStatement> {
  public run() {
    while (this.visitor.visitNode(this.node.test)) {
      const body = this.visitor.visitNode(this.node.body);

      if (body === 'break')
        break;

      if (body === 'continue')
        continue;

      if (body)
        return body;
    }
  }
}