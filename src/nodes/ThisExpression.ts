import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ThisExpression extends BaseJSNode<ESTree.ThisExpression> {
  public run(): any {
    return this.visitor.scope.get('_this');
  }
}