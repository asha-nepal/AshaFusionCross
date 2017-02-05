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

export function reduceTable(data: Array<Object>, rules: Array<Object>) {
  const keys = rules.map(rule => rule.key).filter(key => key);
  const dataColWise = transposeTable(data, keys);

  const result = {};
  rules.forEach(rule => {
    const key = rule.key;
    if (!rule.key) return;

    result[key] = reduce(dataColWise[key], rule);
  });

  return result;
}
