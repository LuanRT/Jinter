import type ESTree from 'estree';
import BaseJSNode from './BaseJSNode.js';

export default class ForOfStatement extends BaseJSNode<ESTree.ForOfStatement> {
  public run(): any {
    this.visitor.visitNode(this.node.left);

    const right_node = this.visitor.visitNode(this.node.right);

    for (const el of right_node) {
      if (this.node.left.type === 'VariableDeclaration' && this.node.left.declarations[0].id.type === 'Identifier') {
        this.visitor.scope.set(this.node.left.declarations[0].id.name, el);
      } else if (this.node.left.type === 'VariableDeclaration' && this.node.left.declarations[0].id.type === 'ObjectPattern') {
        for (const propert of this.node.left.declarations[0].id.properties) {
          if (propert.type === 'Property' && (propert.value.type === 'Identifier' && propert.key.type === 'Identifier')) {
            this.visitor.scope.set(propert.value.name, el[propert.key.name]);
          }
        }
      }

      const body = this.visitor.visitNode(this.node.body);

      if (body === '$jintr_break_') {
        break;
      }

      if (body === '$jintr_continue_') {
        continue;
      }

      if (body && this.node.body.type !== 'ExpressionStatement') {
        return body;
      }
    }
  }
}