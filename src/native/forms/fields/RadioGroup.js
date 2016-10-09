/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  MKRadioButton,
} from 'react-native-material-kit';
import styles from './styles';

type Props = {
  options: Array<{id: string, label: string}>,
  label?: string,
  value: ?string,
  onChange: (newValue: string) => void,
}

export class RadioGroupComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.radioGroup = new MKRadioButton.Group();
  }

  radioGroup: MKRadioButton.Group

  props: Props

  render() {
    const {
      options,
      label,
      value,
      onChange,
    } = this.props;

    return (
      <View>
        <Text style={styles.fieldLabel}>{label || ''}</Text>
        <View style={styles.radioGroupRow}>
        {options.map(option =>
          <View key={option.id} style={styles.radioGroupCol}>
            <MKRadioButton
              checked={option.id === value}
              group={this.radioGroup}
              onCheckedChange={({ checked }) => {
                if (checked) {
                  onChange(option.id);
                }
              }}
            />
            <Text style={styles.legendLabel}>{option.label}</Text>
          </View>
        )}
        </View>
      </View>
    );
  }
}

import connect from '../../../common/forms/fields/RadioGroup';

export const RadioGroup = connect(RadioGroupComponent);
