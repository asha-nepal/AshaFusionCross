/* @flow */
/* eslint-env jest */

jest.unmock('react-router');
jest.unmock('react-redux-form');
jest.unmock('../PatientView.react');

import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';

import PatientView from '../PatientView.react';

describe('<PatientView />', () => {
  it('calls init() and subscribeChange() at componentWillMount() and unsubscribe at componentWillUnmount()', () => { // eslint-disable-line max-len
    const mockInit = jest.fn();
    const mockSubscribeChange = jest.fn();
    const mockUnsubscribeChange = jest.fn();
    mockSubscribeChange.mockReturnValue(mockUnsubscribeChange);

    expect(mockInit).not.toBeCalled();
    expect(mockSubscribeChange).not.toBeCalled();

    const wrapper = shallow(<PatientView
      init={mockInit}
      subscribeChange={mockSubscribeChange}
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      records={[]}
      addNewActiveRecord={jest.fn()}
      putActivePatient={jest.fn()}
      putActiveRecord={jest.fn()}
    />);

    expect(mockInit).toBeCalled();
    expect(mockSubscribeChange).toBeCalled();
    expect(mockUnsubscribeChange).not.toBeCalled();

    wrapper.unmount();

    expect(mockUnsubscribeChange).toBeCalled();
  });

  it('has link to the top', () => {
    const mockInit = jest.fn();
    const mockSubscribeChange = jest.fn();

    const wrapper = shallow(<PatientView
      init={mockInit}
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      records={[]}
      subscribeChange={mockSubscribeChange}
      addNewActiveRecord={jest.fn()}
      putActivePatient={jest.fn()}
      putActiveRecord={jest.fn()}
    />);

    expect(wrapper.find(Link).prop('to')).toBe('/');
    expect(mockInit).toBeCalled();
  });
});
