import fs from 'fs';
import Jinter from '../dist';

const code = fs.readFileSync('./test-code.js').toString();

const jinter = new Jinter(code);
jinter.scope.set('ntoken', 'vPIcacaohWtfY_');
const result = jinter.interpret();

console.info('Transformed sig:', result);