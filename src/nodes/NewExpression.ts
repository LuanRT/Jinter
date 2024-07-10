import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class NewExpression extends BaseJSNode<ESTree.NewExpression> {
  public run() {
    const callee = this.visitor.visitNode(this.node.callee);
    const args = this.node.arguments.map((arg: any) => this.visitor.visitNode(arg));
    return args.length ? new callee(args) : new callee();
  }
}