/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
