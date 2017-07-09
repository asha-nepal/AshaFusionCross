/* eslint-env jest */

jest.unmock('../PrintPage');

import PrintPage from '../PrintPage';

import React from 'react';
import { shallow } from 'enzyme';

describe('<PrintPage/>', () => {
  it('takes patient and record data then render', () => {
    const patient = {
      _id: 'patient_foo',
      name: 'Foo Bar',
      age: { value: 25, unit: 'years' },
      address: 'Tokyo',
    };

    const record = {
      $created_at: (new Date()).getTime(),
      height: { value: 178, unit: 'cm' },
      weight: { vakue: 68, unti: 'kg' },
      pulse: 90,
    };

    shallow(
      <PrintPage
        patient={patient}
        record={record}
      />
    );
  });
});
