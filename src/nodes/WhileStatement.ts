import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class WhileStatement extends BaseJSNode<ESTree.WhileStatement> {
  public run(): any {
    while (this.visitor.visitNode(this.node.test)) {
      const body = this.visitor.visitNode(this.node.body);

      if (body === '$jintr_break_')
        break;

      if (body === '$jintr_continue_')
        continue;

      if (body)
        return body;
    }
  }
}