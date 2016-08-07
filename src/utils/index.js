/* @flow */

import Chance from 'chance';

const chance = new Chance();
const idStringPool = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // URLセーフな文字のみ

export function createId(length: number = 16) {
  return chance.string({ pool: idStringPool, length });
}
