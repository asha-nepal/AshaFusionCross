/* @flow */

import React from 'react';

export default ({
  children,
}: {
  children?: React$Element<any>,
}) => (
  <section className="section">
    <div className="container">
      {children}
    </div>
  </section>
);
