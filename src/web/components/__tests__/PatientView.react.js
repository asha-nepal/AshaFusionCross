jest.unmock('react-router')
jest.unmock('redux-form')
jest.unmock('../PatientView.react')

import { shallow, mount, render } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Link } from 'react-router'

import PatientView from '../PatientView.react'

describe('<PatientView />', () => {
  it('has link to the top', () => {
    const mockFetchPatient = jest.fn()
    const mockSubscribeChange = jest.fn()

    const wrapper = shallow(<PatientView
        params={{patientId: 'dummy_id'}}
        patient={{
          name: 'foo bar',
        }}
        records={[]}
        fetchPatient={mockFetchPatient}
        subscribeChange={mockSubscribeChange}
      />)

    expect(wrapper.find(Link).prop('to')).toBe('/')
  })
})
