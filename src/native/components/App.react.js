import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'

import Root from '../../common/Root.react'

import Title from './Title.react'
import PatientList from '../containers/PatientList.react'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9eaed',
    flex: 1,
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
    paddingTop: 10,
  },
});

export default React.createClass({
  render() {
    return (
      <Root>
        <View style={styles.container}>
          <Title title='ASHA fusion'/>
          <ScrollView style={styles.wrapper}>
            <PatientList />
          </ScrollView>
        </View>
      </Root>
    )
  }
})
