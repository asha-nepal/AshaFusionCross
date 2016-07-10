/* @flow */

import React, { PropTypes } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'

import PouchSettings from '../forms/PouchSettings.react'

import appStyles from './styles'

const styles = {
  ...appStyles,
  ...StyleSheet.create({}),
}

export default React.createClass({
  propTypes: {
    pouchConfig: PropTypes.object.isRequired,
    connectPouchDB: PropTypes.func.isRequired,
  },

  render() {
    const {
      pouchConfig,
      connectPouchDB,
    } = this.props

    return (
      <ScrollView style={styles.container}>
        <Text>Settings</Text>

        <PouchSettings
          initialValues={pouchConfig}
          onSubmit={params => {
            connectPouchDB(params)
          }}
        />
      </ScrollView>
    )
  }
})
