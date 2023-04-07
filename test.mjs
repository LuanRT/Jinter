import { Jinter } from 'jintr';

const code = `
  let a = 1;
  let b = 2;
  let c = a + b;
  console.log(c);
`;

const jinter = new Jinter(code);
jinter.interpret();