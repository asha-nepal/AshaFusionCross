/* @flow */

import React from 'react';

const RankDisplay = ({
  value
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
    return <RankDisplay value={value} />
  }

  return null;
}

export default({
  stats,
  statsRules,
}: {
  stats: {[key: string]: number | string | Array<any>},
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
