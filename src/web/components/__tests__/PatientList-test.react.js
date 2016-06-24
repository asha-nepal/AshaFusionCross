/* @flow */

jest.unmock('../PatientList.react')

import { shallow, mount, render } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

import PatientList from '../PatientList.react'

describe('<PatientList />', () => {
  it('calls fetchPatientList() and subscribeChange() at componentWillMount() and unsubscribe at componentWillUnmount()', () => {
    const mockFetchPatientList = jest.fn()
    const mockSubscribeChange = jest.fn()
    const mockUnsubscribeChange = jest.fn()
    mockSubscribeChange.mockReturnValue(mockUnsubscribeChange)

    expect(mockFetchPatientList).not.toBeCalled()
    expect(mockSubscribeChange).not.toBeCalled()

    const wrapper = shallow(<PatientList
        fetchPatientList={mockFetchPatientList}
        subscribeChange={mockSubscribeChange}
        patientList={[]}
      />)

    expect(mockFetchPatientList).toBeCalled()
    expect(mockSubscribeChange).toBeCalled()
    expect(mockUnsubscribeChange).not.toBeCalled()

    wrapper.unmount()

    expect(mockUnsubscribeChange).toBeCalled()
  })
})
