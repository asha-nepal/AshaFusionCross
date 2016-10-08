/* @flow */

import React, { Component } from 'react';

import {
  View,
} from 'react-native';
import {
  MKButton,
} from 'react-native-material-kit';

import {
  TextField,
} from '../../forms/components';

const ColoredRaisedSignupButton = MKButton.coloredButton()
  .withText('Sign up')
  .build();

type Props = {
  signup: (username: string, password: string) => void,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
    };
  }

  state: {
    username: string,
    password: string,
    passwordConfirm: string,
  };

  props: Props

  render() {
    const {
      signup,
    } = this.props;

    return (
      <View>
        <TextField
          autoCapitalize="none"
          placeholder="Username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />

        <TextField
          secureTextEntry
          placeholder="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <TextField
          secureTextEntry
          placeholder="Password (Confirm)"
          value={this.state.passwordConfirm}
          onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
        />

        <ColoredRaisedSignupButton
          onPress={() => {
            if (!this.state.username) {
              // TODO: Show alert
              return;
            }
            if (!this.state.password) {
              return;
            }
            if (this.state.password !== this.state.passwordConfirm) {
              return;
            }

            signup(this.state.username, this.state.password);
          }}
        />
      </View>
    );
  }
}
