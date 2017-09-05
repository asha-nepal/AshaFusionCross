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
import moment from 'moment';
import _get from 'lodash.get';

type DatumType = Object
type RuleType = {
  key: string,
  entry?: string,
  type?: string,
  unit?: string,
  format?: string,
  pluck?: string,
}

function convert(row: DatumType, rule: RuleType) {
  let datum = _get(row, rule.entry || rule.key);

  if (typeof datum === 'undefined') return null;

  if (rule.pluck && datum.map) {
    datum = datum.map(d => d[rule.pluck]).filter(d => typeof d !== 'undefined');
  }

  switch (rule.type) {
    case 'value_unit': {
      if (typeof datum === 'number' && rule.raw) return datum;
      if (!datum.value || !datum.unit || !rule.unit) return null;

      return math.unit(datum.value, datum.unit).toNumber(rule.unit);
    }

    case 'moment': {
      return moment(datum).format(rule.format);
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
