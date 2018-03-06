/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import math from 'lib/mathjs';

import countRank from './count-rank';

type NestedArray<T> = Array<T|NestedArray<T>>;
export type CanonicalDataType = NestedArray<string | number>

export function reduce(data: Array<any>, rule: Object, nullValue? :string | number) {
  if (data.length === 0) return null;

  const canonicalData: CanonicalDataType = nullValue
    ? data.map(datum => ((datum == null && nullValue) ? nullValue : datum))
    : data.filter(datum => datum != null);

  if (canonicalData.length === 0) return null;

  if (rule.type === 'rank') {
    return countRank(canonicalData, rule.order !== 'desc');
  }

  try {
    return math[rule.type](canonicalData);
  } catch (e) {
    return null;
  }
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
