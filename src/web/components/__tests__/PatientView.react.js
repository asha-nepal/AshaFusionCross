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
    const mockInit = jest.fn()
    const mockSubscribeChange = jest.fn()

    const wrapper = shallow(<PatientView
        init={mockInit}
        patient={{
          name: 'foo bar',
        }}
        records={[]}
        subscribeChange={mockSubscribeChange}
      />)

    expect(wrapper.find(Link).prop('to')).toBe('/')
    expect(mockInit).toBeCalled()
  })
})
