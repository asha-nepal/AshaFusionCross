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

        {isDBPublic &&
          <AnonymousLoginButton
            onPress={() => anonymousLogin()}
          />
        }
      </View>
    );
  }
}
