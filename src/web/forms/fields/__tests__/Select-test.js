/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../Select');

import { shallow } from 'enzyme';
import React from 'react';

import { SelectComponent } from '../Select';

describe('<SelectComponent />', () => {
  it('is `nullable` by default and can disable it', () => {
    const wrapper = shallow(
      <SelectComponent
        options={[
          { id: 'a', label: 'A' },
          { id: 'b', label: 'B' },
          { id: 'c', label: 'C' },
        ]}
      />
    );

    expect(wrapper.find('option').length).toBe(4);

    wrapper.setProps({ nullable: false });

    expect(wrapper.find('option').length).toBe(3);
  });
});
