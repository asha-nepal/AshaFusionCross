/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../MultiInput');

import { shallow } from 'enzyme';
import React from 'react';

import { MultiInputComponent } from '../MultiInput';

describe('<MultiInputComponent />', () => {
  it('shows <input />s according to given values', () => {
    const wrapper = shallow(<MultiInputComponent
      label="THISISMULTIINPUT"
      value={['AAAA', 'BBBB', 'CCCC']}
    />);

    expect(wrapper.find('label').text()).toEqual('THISISMULTIINPUT');

    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(4);  // 3 (given values) + 1 (new value input field)
    expect(inputs.at(0).prop('value')).toEqual('AAAA');
    expect(inputs.at(1).prop('value')).toEqual('BBBB');
    expect(inputs.at(2).prop('value')).toEqual('CCCC');
  });

  it('does not show any <input />s if no value given', () => {
    const wrapper = shallow(<MultiInputComponent
      label="THISISMULTIINPUT"
      value={null}
    />);

    expect(wrapper.find('label').text()).toEqual('THISISMULTIINPUT');

    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(1);  // 0 (given values) + 1 (new value input field)
  });

  it('contains <input />s whose type is specified by prop', () => {
    const wrapper = shallow(<MultiInputComponent
      value={['AAAA', 'BBBB']}
      type="number"
    />);

    const inputs = wrapper.find('input');
    expect(inputs.at(0).prop('type')).toEqual('number');
    expect(inputs.at(1).prop('type')).toEqual('number');
  });
});
