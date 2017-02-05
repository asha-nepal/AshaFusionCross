/* @flow */

import math from 'lib/mathjs';
import _get from 'lodash.get';

type DatumType = Object
type RuleType = { key: string, entry?: string, type?: string, unit?: string }

function convert(row: DatumType, rule: RuleType) {
  const datum = _get(row, rule.entry || rule.key);

  if (typeof datum === 'undefined') return null;

  switch (rule.type) {
    case 'value_unit': {
      if (!datum.value || !datum.unit || !rule.unit) return null;

      return math.unit(datum.value, datum.unit).toNumber(rule.unit);
    }

    default:
      return datum;
  }
}

export function tableize(data: Array<DatumType>, rules: Array<RuleType>, nullValue?: any = null) {
  return data.map(datum => {
    const row = {};
    rules.forEach(rule => {
      const key = rule.key || rule.entry;
      if (!key) return;

      const converted = convert(datum, rule);
      row[key] = converted === null ? nullValue : converted;
    });

    return row;
  });
}
