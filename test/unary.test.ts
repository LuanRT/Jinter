import { Jinter } from '../src/index';
import { expect, test } from 'vitest';

test('Unary Expression', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('!true')).toEqual(false);
  expect(jinter.evaluate('!false')).toEqual(true);
  expect(jinter.evaluate('~1')).toEqual(-2);
  expect(jinter.evaluate('~0')).toEqual(-1);
  expect(jinter.evaluate('+1')).toEqual(1);
  expect(jinter.evaluate('-1')).toEqual(-1);
  expect(jinter.evaluate('typeof 1')).toEqual('number');
  expect(jinter.evaluate('typeof "hello"')).toEqual('string');
  expect(jinter.evaluate('typeof true')).toEqual('boolean');
  expect(jinter.evaluate('typeof null')).toEqual('object');
  expect(jinter.evaluate('typeof undefined')).toEqual('undefined');
  expect(jinter.evaluate('void 0')).toEqual(undefined);
  expect(jinter.evaluate('void 1')).toEqual(undefined);
  expect(jinter.evaluate('delete x')).toEqual(true);
});