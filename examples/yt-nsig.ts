import fs from 'fs';
import Jinter from '..';

const code = fs.readFileSync('./ncode.js').toString();

const jinter = new Jinter(code);
jinter.scope.set('ntoken', 'Xd0yq6O9S6HGHVtbZS');

const result = jinter.interpret();

console.info('Transformed sig:', result);