import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Button from 'react-native-button'

export const SelectButtonGroup = React.createClass({
  propTypes: {
    label: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })),
    value: PropTypes.any,
    disabled: PropTypes.bool,
  },

  render() {
    const {
      label,
      onBlur,
      onChange,
      options,
      value,
      disabled,
    } = this.props

    return (
      <View style={styles.container}>
      {options.map(option => (
        <Button
          key={option.id}
          style={option.id === value ? styles.buttonActive : styles.buttonInactive }
          disabled={disabled}
          onPress={() => {
            onChange(option.id)
          }}
        >{ option.label }</Button>
      ))}
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonActive: {
    flex: 1,
    backgroundColor: '#99aaff',
  },
  buttonInactive: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  }
})
