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

import React from 'react';

import translators from './translators';

const RankDisplay = ({
  value,
  translator,
}: {
  value: Array<[Array<string>, number]>,
  translator?: Function,
}) => (
  <table className="table">
    <tbody>
      {value.map((item, i) => {
        const count = item[1];
        const rawTitles = Array.isArray(item) ? item[0] : [item[0]];
        const titles = translator ? rawTitles.map(translator) : rawTitles;

        return (
          <tr key={i}>
            <th>{count}</th>
            <td>{titles.join(', ')}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const ValueDisplay = ({
  value,
  translator,
}: {
  value: string | number | Array<[Array<string>, number]>,
  translator?: Function
}) => {
  if (typeof value === 'string' || typeof value === 'number') return <span>{value}</span>;

  if (Array.isArray(value)) {  // `rank` type
    return <RankDisplay value={value} translator={translator} />;
  }

  return null;
};

export default({
  stats,
  statsRules,
}: {
  stats: {[key: string]: any},
  statsRules: {[key: string]: {name: string, translator?: string}},
}) => (
  <div>
    <h3 className="subtitle">Stats</h3>
    <table className="table">
      <tbody>
        {Object.keys(stats).map(key => {
          const stat = stats[key];
          const rule = statsRules[key];

          if (stat == null || rule == null) return null;

          return (
            <tr key={key}>
              <th>{rule.name || key}</th>
              <td>
                <ValueDisplay
                  value={stat}
                  translator={rule.translator && translators[rule.translator]}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
