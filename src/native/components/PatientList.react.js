/* @flow */

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    flex: 1,
  },
})

export default React.createClass({
  propTypes: {
    isFetching: PropTypes.bool,
    fetchPatientList: PropTypes.func.isRequired,
    subscribeChange: PropTypes.func.isRequired,
    patientList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
    onPatientSelect: PropTypes.func.isRequired,
  },

  getInitialState() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    return {
      ds: ds.cloneWithRows(this.props.patientList || []),
      unsubscribeChange: null,
    }
  },

  componentWillMount() {
    this.props.fetchPatientList()

    this.setState({
      unsubscribeChange: this.props.subscribeChange()
    })
  },

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange()
    }
  },

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.patientList !== this.props.patientList) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.patientList || [])
      })
    }
  },

  _renderRow(rowData: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
        this.props.onPatientSelect(rowData._id)
        highlightRow(sectionID, rowID);
      }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render() {
    const {
      isFetching,
    } = this.props

    if (isFetching) {
      return <Text>Fetching patient list...</Text>
    }

    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this._renderRow}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        enableEmptySections={true}
      />
    )
  },
})
