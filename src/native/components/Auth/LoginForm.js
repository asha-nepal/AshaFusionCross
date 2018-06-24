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

const ColoredRaisedLoginButton = MKButton.coloredButton()
  .withText('Log in')
  .build();

const AnonymousLoginButton = MKButton.button()
  .withText('Log in as anonymous user')
  .build();

type Props = {
  login: (username: string, password: string) => void,
  isDBPublic: boolean,
  anonymousLogin: () => void,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  state: {
    username: string,
    password: string,
  };

  props: Props

  render() {
    const {
      login,
      isDBPublic,
      anonymousLogin,
    } = this.props;

    return (
      <View>
        <TextField
          autoCapitalize="none"
          placeholder="username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />

        <TextField
          secureTextEntry
          placeholder="password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <ColoredRaisedLoginButton
          onPress={() => {
            login(this.state.username, this.state.password);
          }}
        />

        {isDBPublic
          && (
          <AnonymousLoginButton
            onPress={() => anonymousLogin()}
          />
          )
        }
      </View>
    );
  }
}
