/* eslint-env jest */
jest.unmock('react-router');
jest.unmock('../Header');

import { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

describe('<PatientView.Header />', () => {
  it('has link that fires onBackRequested() callback prop whichever verbose is (false ver)', () => {
    const ev = { preventDefault: jest.fn() };
    const onBackRequested = jest.fn();
    const wrapper = shallow(
      <Header
        patient={{
          _id: 'patient_foo',
          name: 'foo bar',
        }}
        onBackRequested={onBackRequested}
        verbose={false}
      />
    );

    const backLink = wrapper.find('.nav-left').find('a').at(0);
    backLink.simulate('click', ev);
    expect(onBackRequested).toBeCalled();
  });

  it('has link that fires onBackRequested() callback prop whichever verbose is (true ver)', () => {
    const ev = { preventDefault: jest.fn() };
    const onBackRequested = jest.fn();
    const wrapper = shallow(
      <Header
        patient={{
          _id: 'patient_foo',
          name: 'foo bar',
        }}
        onBackRequested={onBackRequested}
        verbose
      />
    );

    const backLink = wrapper.find('.nav-left').find('a').at(0);
    backLink.simulate('click', ev);
    expect(onBackRequested).toBeCalled();
  });
});
