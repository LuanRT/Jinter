import fs from 'fs';
import { Jinter } from '../src/index.ts';

const jinter = new Jinter();
jinter.scope.set('ntoken', 'G2fACC5OaSOmA_7a');
const code = fs.readFileSync('./test-code.js').toString();
const result = jinter.evaluate(code);

console.info('Transformed sig:', result);