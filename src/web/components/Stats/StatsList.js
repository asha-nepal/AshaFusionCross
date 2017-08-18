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

const RankDisplay = ({
  value,
}: {
  value: Array<[Array<string>, number]>,
}) => (
  <table className="table">
    <tbody>
      {value.map((item, i) =>
        <tr key={i}>
          <th>{item[1]}</th>
          <td>{item[0].join ? item[0].join(', ') : item[0]}</td>
        </tr>
      )}
    </tbody>
  </table>
);

const ValueDisplay = ({
  value,
}: {
  value: string | number | Array<[Array<string>, number]>
}) => {
  if (typeof value === 'string' || typeof value === 'number') return <span>{value}</span>;

  if (Array.isArray(value)) {  // `rank` type
    return <RankDisplay value={value} />;
  }

  return null;
};

export default({
  stats,
  statsRules,
}: {
  stats: {[key: string]: any},
  statsRules: {[key: string]: {name: string}},
}) => (
  <div>
    <h3 className="subtitle">Stats</h3>
    <table className="table">
      <tbody>
        {Object.keys(stats).map(key =>
          <tr key={key}>
            <th>{statsRules[key].name || key}</th>
            <td><ValueDisplay value={stats[key]} /></td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
