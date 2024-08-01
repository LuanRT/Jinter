import fs from 'fs';
import { Jinter } from 'jintr';

const jinter = new Jinter();
jinter.scope.set('ntoken', 'vPIcacaohWtfY_');
const code = fs.readFileSync('./test-code.js').toString();
const result = jinter.evaluate(code);

console.info('Transformed sig:', result);