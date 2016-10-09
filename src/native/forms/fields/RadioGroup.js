/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  MKRadioButton,
} from 'react-native-material-kit';

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
        <Text>{label || ''}</Text>
        {options.map(option =>
          <View key={option.id}>
            <Text>{option.label}</Text>
            <MKRadioButton
              checked={option.id === value}
              group={this.radioGroup}
              onCheckedChange={({ checked }) => {
                if (checked) {
                  onChange(option.id);
                }
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

import connect from '../../../common/forms/fields/RadioGroup';

export const RadioGroup = connect(RadioGroupComponent);
