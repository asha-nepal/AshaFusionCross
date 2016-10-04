/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { MKButton } from 'react-native-material-kit';

import logo from '../../../assets/img/logo.png';

// TODO: ../forms/stylesと共通化？
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    flex: 0,
  },
  title: {
    fontSize: 32,
    color: '#606060',
  },
  textInput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
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
  children: React$Element<any>,
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
      <View style={styles.container}>
        <View
          style={styles.logoContainer}
        >
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text
            style={styles.title}
          >ASHA fusion</Text>
        </View>

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
