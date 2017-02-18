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

export default function (data: CanonicalDataType) {
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

  return result.sort((a, b) => a[1] - b[1]);
}
