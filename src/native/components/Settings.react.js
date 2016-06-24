/* @flow */

import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'

import PouchSettings from '../forms/PouchSettings.react'

export default React.createClass({
  propTypes: {
    hostname: PropTypes.string,
    port: PropTypes.number,
    dbname: PropTypes.string,
    connectPouchDB: PropTypes.func.isRequired,
  },

  render() {
    const {
      hostname,
      port,
      dbname,
      connectPouchDB
    } = this.props

    return (
      <View>
        <Text>Settings</Text>

        <PouchSettings
          initialValues={{
            hostname,
            port: port ? port.toString() : '',
            dbname
          }}
          onSubmit={params => {
            connectPouchDB(
              params.hostname,
              parseInt(params.port, 10) || null,
              params.dbname
            )
          }}
        />
      </View>
    )
  }
})
