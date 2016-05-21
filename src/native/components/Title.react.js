import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default React.createClass({
  render() {
    const back = this.props.onBack ? (
      <Text onPress={this.props.onBack}>Back</Text>
      ) : null
      
    return (
      <View style={styles.container}>
        { back }
        <Text style={styles.text}>
          {this.props.title}
        </Text>

      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 10,
    marginBottom: 0,
    height: 45,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 19,
    fontWeight: '500',
  },
});
