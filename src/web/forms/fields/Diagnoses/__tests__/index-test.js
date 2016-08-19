/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../index');

import { shallow } from 'enzyme';
import React from 'react';

import { DiagnosesComponent } from '../index';

describe('<Diagnoses />', () => {
  it('contains label', () => {
    const wrapper = shallow(<DiagnosesComponent
      label="THISISDIAGNOSES"
      diagnoses={[]}
    />);

    expect(wrapper.find('label').text()).toEqual('THISISDIAGNOSES');
  });

  it('contains rows according to specified diagnoses', () => {
    const wrapper = shallow(<DiagnosesComponent
      diagnoses={[
        { icd10: 'A12.34', text: 'hoge' },
        { icd10: 'Z98.76', text: 'fuga' },
      ]}
    />);

    expect(wrapper.find('tr').length).toEqual(3);  // 2 (value rows) + 1 (header row)
  });

  it('contains no row when null given as diagnoses prop', () => {
    const wrapper = shallow(<DiagnosesComponent
      diagnoses={null}
    />);

    expect(wrapper.find('tr').length).toEqual(1);  // 0 (value rows) + 1 (header row)
  });

  it('does not throw error if insufficient values given', () => {
    const wrapper = shallow(<DiagnosesComponent
      diagnoses={[
        {},
        { text: 'hoge' },
        { icd10: 'Z98.76' },
      ]}
    />);

    expect(wrapper.find('tr').length).toEqual(4);  // 3 (value rows) + 1 (header row)
  });
});
