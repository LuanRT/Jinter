import fs from 'fs';
import { Jinter } from '../src/index';
import { expect, test } from 'vitest';

test('Variable Declaration', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let x = 1; x;')).toEqual(1);
});

test('Variable Assignment', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let x = 1; x = 2; x;')).toEqual(2);
});

test('Function Declaration', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('function foo(str) { return str; } foo("bar");')).toEqual('bar');
});

test('Object Declaration', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let obj = { x: 1, y: { z: 2 } }; obj.y.z;')).toEqual(2);
});

test('For Loop', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let sum = 0; for (let i = 0; i < 10; i++) { sum += i; } sum;')).toEqual(45);
});

test('For Of Loop', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let sum = 0; for (let i of [1, 2, 3, 4, 5]) { sum += i; } sum;')).toEqual(15);
});

test('While Loop', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let sum = 0; let i = 0; while (i < 10) { sum += i; i++; } sum;')).toEqual(45);
});

test('If Statement', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let x = 1; if (x === 1) { x = 2; } x;')).toEqual(2);
});

test('Arrow Function', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('const foo = (str) => str; foo("bar");')).toEqual('bar');
});

test('Array Declaration', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('const arr = [1, 2, 3]; arr[1];')).toEqual(2);
});

test('Try Catch Statement', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let x = 1; try { throw "yoinks"; } catch (e) { x = 2; } x;')).toEqual(2);
});

test('Regex Declaration', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('const regex = /foo/; regex.test("foo");')).toEqual(true);
});

test('Template Literal', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('const a = "gregg rulz ok"; const str = `${a}`; str;')).toEqual('gregg rulz ok');
});

test('Sample Program', () => {
  const nsigCode = fs.readFileSync('./examples/test-code.js').toString();

  const jinter = new Jinter();
  jinter.scope.set('ntoken', 'G2fACC5OaSOmA_7a');

  expect(jinter.evaluate(nsigCode)).toEqual('2kLWUVMVUg-tsQ');
});