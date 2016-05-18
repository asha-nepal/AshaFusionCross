import React from 'react'
import {
  Component,
} from 'react-native'

import {
  Provider,
} from 'react-redux'

import configureStore from '../../store/configureStore'

const store = configureStore()

import PatientList from '../containers/PatientList.react'

export default class extends Component {
  render() {
    return (
      <Provider store={store} >
        <PatientList />
      </Provider>
    )
  }
}
