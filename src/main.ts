import Visitor from './visitor';
import { parse } from 'acorn';
    
export default class Jinter {
  private ast: any;
  
  public visitor: Visitor;
  public scope: Map<string, any>;
  
  constructor (input: string) {
    const program = parse(input,  { ecmaVersion: 2020 });
     
    this.ast = program.body;
    
    this.visitor = new Visitor(this.ast);
    this.scope = this.visitor.scope;
   
    this.visitor.on('console', (node: any, visitor: Visitor) => {
      if (node.type === 'Identifier') 
        return console;
      
      const prop: keyof Console = visitor.visitNode(node.callee.property);
      const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
   
      const console_prop = console[prop] as Function;
      
      if (!console_prop)
        return 'proceed';
      
      return console_prop(...args);
    });
    
    this.visitor.on('Math', (node: any, visitor: Visitor) => {
      if (node.type === 'Identifier') 
        return Math;
      
      const prop: keyof Math = visitor.visitNode(node.callee.property);
      const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
   
      const math_prop = Math[prop] as Function;
      
      if (!math_prop)
        return 'proceed';
      
      return math_prop(...(args as [ number, number ]));
    });
    
    this.visitor.on('String', (node: any, visitor: Visitor) => {
      if (node.type === 'Identifier') 
        return String;
      
      const prop: keyof typeof String = visitor.visitNode(node.callee.property);
      const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
      
      const string_prop = String[prop] as Function;
      
      if (!string_prop)
        return 'proceed';
     
      return string_prop(args);
    });
    
    this.visitor.on('Date', (node: any) => {
      if (node.type === 'Identifier') 
        return Date;
    });
  }
  
  public interpret() {
    return this.visitor.run();
  }
}