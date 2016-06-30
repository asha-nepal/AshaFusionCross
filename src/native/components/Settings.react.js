/* @flow */

import React, { PropTypes } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'

import PouchSettings from '../forms/PouchSettings.react'

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
  }
})

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
      <ScrollView style={styles.container}>
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
      </ScrollView>
    )
  }
})
