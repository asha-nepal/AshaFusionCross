/* eslint-env jest */
jest.unmock('../RecordsTab');

import React from 'react';
import { shallow } from 'enzyme';

import RecordsTab from '../RecordsTab';

describe('<RecordsTab />', () => {
  it('shows $created_at or $initialized_at field', () => {
    const date1 = new Date(2015, 4, 1, 10, 30, 30);
    const date2 = new Date(2015, 6, 2, 12, 24, 50);
    const date3 = new Date(2015, 8, 3, 14, 10, 30);

    const records = [
      {
        _id: '001',
        $initialized_at: date1.getTime(),
        $created_at: date2.getTime(),
      },
      {
        _id: '002',
        $initialized_at: date3.getTime(),
      },
    ];

    const wrapper = shallow(
      <RecordsTab
        records={records}
      />
    );

    expect(wrapper.find('a small').at(0).text())
      .toEqual(date2.toDateString());
    expect(wrapper.find('a small').at(1).text())
      .toEqual(date3.toDateString());
  });
});
