/* eslint-env jest */
jest.unmock('react-router');
jest.unmock('../Header');

import { Link } from 'react-router';
import { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

describe('<PatientView.Header />', () => {
  it('has link to the top when verbose prop is set as false', () => {
    const wrapper = shallow(<Header
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      verbose={false}
    />);

    expect(wrapper.find(Link).at(0).prop('to')).toBe('/');
  });

  it('has link to the top when verbose prop is set as true', () => {
    const wrapper = shallow(<Header
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      verbose
    />);

    expect(wrapper.find(Link).at(0).prop('to')).toBe('/');
  });
});
