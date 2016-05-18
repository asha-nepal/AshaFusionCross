import React from 'react'
import {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})

export default class extends Component {
  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      ds: ds.cloneWithRows(props.patientList || []),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patientList !== this.props.patientList) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.patientList || [])
      })
    }
  }

  _renderRow(rowData) {
    return (
      <Text>{rowData.name}</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.ds}
          renderRow={this._renderRow}
          enableEmptySections={true}
        />
      </View>
    )
  }
}
