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
  ...getParams(),
})

const mapDispatchToProps = (dispatch) => ({
  connectPouchDB: (hostname, port, dbname) => dispatch(connectPouchDB(
    hostname,
    port,
    dbname
  ))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
