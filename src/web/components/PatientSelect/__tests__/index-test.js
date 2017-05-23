/* @flow */
/* eslint-env jest */

jest.unmock('react-router-dom');
jest.unmock('../index');

import { shallow } from 'enzyme';
import React from 'react';

import PatientSelect from '../index';

describe('<PatientSelect />', () => {
  it('calls fetchPatientList() at componentWillMount()', () => {
    const mockFetchPatientList = jest.fn();

    expect(mockFetchPatientList).not.toBeCalled();

    shallow(<PatientSelect
      fetchPatientList={mockFetchPatientList}
      patientList={[]}
    />);

    expect(mockFetchPatientList).toBeCalled();
  });
});
