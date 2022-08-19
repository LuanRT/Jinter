import Jinter from '..';

describe('Jinter Tests', () => { 
  it('should define variables', () => {
    const code = `
      const greeting = 'Hi there!';
      let num = 24;
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.has('greeting')).toBeTruthy();
    expect(jinter.scope.has('num')).toBeTruthy();
  });
  
  it('should define functions', () => {
    const code = `
      function fn(arg) { return arg; }
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.has('fn')).toBeTruthy();
  });
  
  it('should call functions', () => {
    const code = `
      function greet(person) {
        print('Hey there ' + person + '!'); 
      }
      
      greet('Jacob');
    `
    
    const jinter = new Jinter(code);
    
    jinter.visitor.on('print', (node: any, visitor: any) => {
      const args = node.arguments.map((arg: any) => visitor.visitNode(arg));
      expect(args.includes('Hey there Jacob!')).toBeTruthy();
      return;
    });
    
    jinter.interpret();
  });
  
  it('should create objects', () => {
    const code = `
      const myobj = {
        level_1: {
          prop: 1,
          level_2: {
            prop: 2
          }
        }
      }
      
      const comparison = myobj.level_1.prop === myobj.level_2.prop;
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.get('comparison')).toBeFalsy();
  });
  
  it('should do basic math', () => {
    const code = `
      const addition = 10 + 5;
      const subtraction = 200 - 100;
      const division = 50 / 2;
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.get('addition')).toEqual(15);
    expect(jinter.scope.get('subtraction')).toEqual(100);
    expect(jinter.scope.get('division')).toEqual(25);
  });
  
  it('should support for loops', () => {
    const code = `
      let last_index = 0;
      
      for (let i = 0; i <= 10; i++) {
        last_index = i;
      }
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.get('last_index')).toEqual(10);
  });
  
  it('should support while loops', () => {
    const code = `
      let num_1 = 0;
      let num_2 = 200;
      
      while (num_1 < num_2) {
        num_1++;
      }
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.get('num_1')).toEqual(200);
  });
  
  it('should support if statements', () => {
    const code = `
      let num_1 = 0;
      let num_2 = 200;
      let result;
      
      if (num_1 < num_2) {
        result = 'It is smaller';
      } else {
        result = 'It is bigger';
      }
    `;
    
    const jinter = new Jinter(code);
    jinter.interpret();
    
    expect(jinter.scope.get('result')).toBe('It is smaller');
  });
});