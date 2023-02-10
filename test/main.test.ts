import Jinter from '..';
import fs from 'fs';

describe('Jinter Tests', () => {
  describe('Logical Expressions', () => {
    it('should support logical AND', () => {
      const code = `
        const result = true && false;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });

    it('should support logical OR', () => {
      const code = `
        const result = true || false;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
    });

    it('should support nullish coalescing', () => {
      const code = `
        const result = null ?? false;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });
  });

  describe('Update Expressions', () => {
    it('should support increment', () => {
      const code = `
        const num = 10;
        const result = num++;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(10);
      expect(jinter.scope.get('num')).toEqual(11);
    });

    it('should support decrement', () => {
      const code = `
        const num = 10;
        const result = num--;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(10);
      expect(jinter.scope.get('num')).toEqual(9);
    });

    it('should support prefix increment', () => {
      const code = `
        const num = 10;
        const result = ++num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(11);
      expect(jinter.scope.get('num')).toEqual(11);
    });

    it('should support prefix decrement', () => {
      const code = `
        const num = 10;
        const result = --num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(9);
      expect(jinter.scope.get('num')).toEqual(9);
    });
  });

  describe('Unary Expressions', () => {
    it('should support negation', () => {
      const code = `
        const num = 10;
        const result = -num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(-10);
    });

    it('should support plus', () => {
      const code = `
        const num = 10;
        const result = +num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(10);
    });

    it('should support logical not', () => {
      const code = `
        const bool = true;
        const result = !bool;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });

    it('should support bitwise not', () => {
      const code = `
        const num = 10;
        const result = ~num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(-11);
    });

    it('should support typeof', () => {
      const code = `
        const num = 10;
        const result = typeof num;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual('number');
    });

    it('should support void', () => {
      const code = `
        const result = void 0;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(undefined);
    });

    it('should support delete', () => {
      const code = `
        const obj = { a: 1, b: 2, c: 3 };
        const result = delete obj.a;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
      expect(jinter.scope.get('obj')).toEqual({ b: 2, c: 3 });
    });
  });

  describe('Binary Expressions', () => {
    it('should support equality', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 == num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });

    it('should support strict equality', () => {
      const code = `
        const num_1 = 10;
        const num_2 = '10';
        const result = num_1 === num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });

    it('should support inequality', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 != num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
    });

    it('should support strict inequality', () => {
      const code = `
        const num_1 = 10;
        const num_2 = '10';
        const result = num_1 !== num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
    });

    it('should support greater than', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 > num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
    });

    it('should support greater than or equal to', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 >= num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(true);
    });

    it('should support less than', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 < num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(false);
    });

    it('should support addition', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 + num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(15);
    });

    it('should support subtraction', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 - num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(5);
    });

    it('should support multiplication', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 * num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(50);
    });

    it('should support division', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 5;
        const result = num_1 / num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(2);
    });

    it('should support exponentiation', () => {
      const code = `
        const num_1 = 2;
        const num_2 = 3;
        const result = num_1 ** num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(8);
    });

    it('should support modulus', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 % num_2;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(1);
    });

    it('should support left shift', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 << num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(80);
    });

    it('should support right shift', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 >> num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(1);
    });

    it('should support unsigned right shift', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 >>> num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(1);
    });

    it('should support bitwise AND', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 & num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(2);
    });

    it('should support bitwise XOR', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 ^ num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(9);
    });

    it('should support bitwise OR', () => {
      const code = `
        const num_1 = 10;
        const num_2 = 3;
        const result = num_1 | num_2;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toEqual(11);
    });

    it('should support "in" operator', () => {
      const code = `
        const obj = { a: 1, b: 2 };
        const result = 'a' in obj;
      `;
      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toBeTruthy();
    });

    it('should support "instanceof" operator', () => {
      const code = `
        const that_date = new Date('1969-07-20');
        const result = that_date instanceof Date;
      `;

      const jinter = new Jinter(code);
      jinter.interpret();

      expect(jinter.scope.get('result')).toBeTruthy();
    });
  });

  describe('General', () => {

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

    it('should support for loops', () => {
      const code = `
        function run() {
          for (let i = 0; i < 100; i++) {
            if (i === 50) {
              return i;
            }
          }
        }
      
        run();
      `;

      const jinter = new Jinter(code);
      const result = jinter.interpret();

      expect(result).toEqual(50);
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

    it('should support arrow functions', () => {
      const code = `
        const fn = (arg) => arg;
        fn('hello');
      `;

      const jinter = new Jinter(code);
      const result = jinter.interpret();

      expect(result).toBe('hello');
    });

    it('should interpret a small program', async () => {
      const nsig_code = fs.readFileSync('./examples/test-code.js').toString();

      const jinter = new Jinter(nsig_code);
      jinter.scope.set('ntoken', 'vPIcacaohWtfY_');
    
      const result = jinter.interpret();

      expect(result).toBe('-pK0vFvet_mXoA');
    });
  });
});
