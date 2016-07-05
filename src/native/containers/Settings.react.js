/* @flow */

import { connect } from 'react-redux'
import {
  connectPouchDB,
} from '../../actions'

import Settings from '../components/Settings.react'

import {
  getParams,
} from '../../db'

const mapStateToProps = (state) => ({
  pouchConfig: getParams(),
})

const mapDispatchToProps = (dispatch) => ({
  connectPouchDB: (pouchConfig) => dispatch(connectPouchDB(pouchConfig))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
