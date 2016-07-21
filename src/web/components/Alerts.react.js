/* @flow */

import React from 'react';

export default function Alerts({ alerts }: { alerts: Array<Alert> }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 10,
      }}
    >
    {alerts.map(alert =>
      <div
        key={alert.id}
        className={'notification is-danger'}
      >{alert.message}</div>
    )}
    </div>
  );
}
