/* @flow */
/* eslint-env jest */

jest.unmock('react-router');
jest.unmock('../PatientSelect.react');

import { shallow } from 'enzyme';
import React from 'react';

import PatientSelect from '../PatientSelect.react';

describe('<PatientSelect />', () => {
  it('calls fetchPatientList() and subscribeChange() at componentWillMount() and unsubscribe at componentWillUnmount()', () => { // eslint-disable-line max-len
    const mockFetchPatientList = jest.fn();
    const mockSubscribeChange = jest.fn();
    const mockUnsubscribeChange = jest.fn();
    mockSubscribeChange.mockReturnValue(mockUnsubscribeChange);

    expect(mockFetchPatientList).not.toBeCalled();
    expect(mockSubscribeChange).not.toBeCalled();

    const wrapper = shallow(<PatientSelect
      fetchPatientList={mockFetchPatientList}
      subscribeChange={mockSubscribeChange}
      patientList={[]}
    />);

    expect(mockFetchPatientList).toBeCalled();
    expect(mockSubscribeChange).toBeCalled();
    expect(mockUnsubscribeChange).not.toBeCalled();

    wrapper.unmount();

    expect(mockUnsubscribeChange).toBeCalled();
  });
});
