/* @flow */

import React from 'react';

const modifiers = {
  error: 'is-danger',
  info: 'is-info',
};

export default function Alerts({ alerts }: { alerts: Array<Alert> }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
    {alerts.map(alert =>
      <div
        key={alert.id}
        className={`notification ${modifiers[alert.type]}`}
      >{alert.message}</div>
    )}
    </div>
  );
}
