import React, {
  Component,
} from 'react'

import {
  Provider,
} from 'react-redux'

import rootSaga from '../sagas'
import configureStore from '../store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

export default class extends Component {
  render() {
    return (
      <Provider store={store} >
        { this.props.children }
      </Provider>
    )
  }
}
