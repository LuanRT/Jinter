import { Jinter } from '../src/index';
import { expect, test } from 'vitest';

test('Update Expression', () => {
  const jinter = new Jinter();
  expect(jinter.evaluate('let x = 1; x++')).toEqual(1);
  expect(jinter.evaluate('let x = 1; x--')).toEqual(1);
  expect(jinter.evaluate('let x = 1; ++x')).toEqual(2);
  expect(jinter.evaluate('let x = 1; --x')).toEqual(0);
  expect(jinter.evaluate('let x = 1; x += 1')).toEqual(2);
  expect(jinter.evaluate('let x = 1; x -= 1')).toEqual(0);
  expect(jinter.evaluate('let x = 1; x *= 2')).toEqual(2);
  expect(jinter.evaluate('let x = 1; x /= 2')).toEqual(0.5);
  expect(jinter.evaluate('let x = 1; x %= 2')).toEqual(1);
  expect(jinter.evaluate('let x = 1; x **= 2')).toEqual(1);
  expect(jinter.evaluate('let x = 1; x <<= 2')).toEqual(4);
  expect(jinter.evaluate('let x = 1; x >>= 2')).toEqual(0);
  expect(jinter.evaluate('let x = 1; x >>>= 2')).toEqual(0);
  expect(jinter.evaluate('let x = 1; x &= 2')).toEqual(0);
  expect(jinter.evaluate('let x = 1; x ^= 2')).toEqual(3);
  expect(jinter.evaluate('let x = 1; x |= 2')).toEqual(3);
});