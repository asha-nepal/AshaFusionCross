/* @flow */

import math from 'lib/mathjs';
import _get from 'lodash.get';

type DatumType = Object
type RuleType = { key: string, entry?: string, type?: string, unit?: string }

function convert(row: DatumType, rule: RuleType) {
  const datum = _get(row, rule.entry || rule.key);

  switch (rule.type) {
    case 'value_unit': {
      return math.unit(datum.value, datum.unit).toNumber(rule.unit);
    }

    default:
      return datum;
  }
}

export function tableize(data: Array<DatumType>, rules: Array<RuleType>) {
  return data.map(datum => {
    const row = {};
    rules.forEach(rule => {
      const key = rule.key || rule.entry;
      if (!key) return;

      row[key] = convert(datum, rule);
    });

    return row;
  });
}
