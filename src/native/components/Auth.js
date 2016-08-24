/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { MKButton } from 'react-native-material-kit';

// TODO: ../forms/stylesと共通化？
const styles = StyleSheet.create({
  textInput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
});

const ColoredRaisedLoginButton = MKButton.coloredButton()
  .withText('Log in')
  .build();

type Props = {
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  children: ReactElement,
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

  props: Props;

  render() {
    const {
      loggedIn,
      login,
      children,
    } = this.props;

    if (loggedIn) return children;

    return (
      <View>
        <Text>Log in</Text>

        <Text>username</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />

        <Text>password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <ColoredRaisedLoginButton
          onPress={() => {
            login(this.state.username, this.state.password);
          }}
        />
      </View>
    );
  }
}
