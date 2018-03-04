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
import type { CanonicalDataType } from './index';

const countData = (data: CanonicalDataType, _counts = {}): {[key: string]: number} => {
  let counts = { ..._counts };

  data.forEach(datum => {
    if (Array.isArray(datum)) {
      counts = {
        ...counts,
        ...countData(datum, counts),
      };
    } else {
      if (counts.hasOwnProperty(datum)) {
        ++counts[datum];
      } else {
        counts[datum] = 1;
      }
    }
  });

  return counts;
};

export default function (data: CanonicalDataType, asc: boolean = true) {
  const counts = countData(data);

  const groupedCounts = {}; // { count: value }
  Object.keys(counts).forEach(value => {
    const count = counts[value];
    if (groupedCounts.hasOwnProperty(count)) {
      groupedCounts[count].push(value);
    } else {
      groupedCounts[count] = [value];
    }
  });

  const result = Object.keys(groupedCounts).map(count =>
    [groupedCounts[count], parseInt(count, 10)]
  );

  const order = asc ? 1 : -1;

  return result.sort((a, b) => (a[1] - b[1]) * order);
}
