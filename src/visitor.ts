import getNode from './map';

export default class Visitor {
  public scope: Map<string, any> = new Map();
  public listeners: { [key: string ]: Function } = {};
 
  // TODO: properly type AST, see https://github.com/acornjs/acorn/issues/1136
  public ast: any[];
  
  constructor (ast: any[]) {
    this.ast = ast;
  }
  
  /**
   * Starts interpreting the program.
   */
  public run() {
    let result;
    
    for (const node of this.ast) {
      result = this.visitNode(node);
    }
    
    return result;
  }
  
  /**
   * Visits given node and executes it.
   */
  public visitNode(node: any) {
    if (!node)
      return null;

    try {
      const target_node = getNode(node.type);
      return target_node.visit(node, this);
    } catch (err: any) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.warn('Node not implemented:', node);
      } else  {
        throw err;
      }
    }
  }
  
    
  /**
   * Listens for node calls. Can be used to implement new functionality.
   * @param node_name - the node to listen for.
   * @param fn - the callback function.
   */
  public on(node_name: string, fn: Function) {
    this.listeners[node_name] = fn;
  }
}