/* @flow */

import math from 'lib/mathjs';

export function reduce(data: Array<any>, rule: Object, nullValue? :any) {
  if (data.length === 0) return null;

  const canonicalData = nullValue
    ? data.map(datum => (datum == null ? nullValue : datum))
    : data.filter(datum => datum != null);

  return math[rule.type](canonicalData);
}

export function transposeTable(
  data: Array<Object>, keys: Array<string>
): {[key: string]: Array<any>} {
  const nData = data.length;
  const dataColWise = {};
  keys.forEach(key => {
    dataColWise[key] = new Array(nData);
  });

  data.forEach((datum, i) => {
    keys.forEach(key => {
      dataColWise[key][i] = datum[key];
    });
  });

  return dataColWise;
}

export function reduceTable(data: Array<Object>, rules: {[key: string]: Object}) {
  const keys = Object.keys(rules);
  const entryKeys = keys.map(key => rules[key].entry || key);
  const dataColWise = transposeTable(data, entryKeys);
  const result = {};
  keys.forEach(key => {
    const rule = rules[key];
    const entryKey = rule.entry || key;
    result[key] = reduce(dataColWise[entryKey], rule);
  });

  return result;
}
