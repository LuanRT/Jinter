import getNode from './map';
import type { Node } from 'estree';
import package_json from '../package.json';

export type Listener = (node: Node, visitor: Visitor) => any;

export default class Visitor {
  public scope: Map<string, any> = new Map();
  public listeners: { [key: string]: Listener } = {};
  public ast: Node[];

  constructor(ast: Node[]) {
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
  public visitNode(node?: Node | null) {
    if (!node)
      return null;

    try {
      const target_node = getNode(node.type);
      return target_node.visit(node, this);
    } catch (err) {
      this.#printError(node, err);
    }
  }

  /**
   * Gets the name of a node.
   * @param node - The target node.
   */
  public getName(node: Node) {
    if (node.type === 'Identifier')
      return node.name;
    else if (node.type === 'Literal')
      return node.value as string;
  }

  /**
   * Listens for node calls. Can be used to override default behavior or add new functionality.
   * @param node_name - The node to listen for.
   * @param listener - The callback function.
   */
  public on(node_name: string, listener: Listener): void {
    this.listeners[node_name] = listener;
  }

  #printError(node: Node, err: any) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.warn(`Node ${node.type} not found!\nThis is a bug, please report it at ${package_json.bugs.url}.`);
    } else throw err;
  }
}