import React from 'react'

import {
  Provider,
} from 'react-redux'

import rootSaga from '../sagas'
import configureStore from '../store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

export default React.createClass({
  render() {
    return (
      <Provider store={store} >
        { this.props.children }
      </Provider>
    )
  },
})
