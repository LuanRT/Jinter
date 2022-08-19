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
    
    const console_polyfill = {
      log: (args: any[]) => console.log(...args)
    }
    
    const string_polyfill = {
      fromCharCode: (num: number) => String.fromCharCode(num)
    };
    
    const math_polyfill = {
      pow: (args: [ number, number ]) => Math.pow(...args)
    }
    
    this.scope.set('console', console_polyfill);
    this.scope.set('String', string_polyfill);
    this.scope.set('Math',  math_polyfill);
    this.scope.set('Date', Date);
  }
  
  public interpret() {
    return this.visitor.run();
  }
}