/**
 * Copyright 2016 Yuichiro Tsuchiya
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

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { DefaultRenderer } from 'react-native-router-flux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import DBConfigForm from './DBConfigForm';

import logo from '../../../../assets/img/logo.png';

// TODO: ../forms/stylesと共通化？
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
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
    height: 32,
    marginBottom: 8,
  },
});


export default ({
  isDBConnected,
  currentDBConfig,
  connectDB,
  isDBPublic,
  loggedIn,
  login,
  anonymousLogin,
  signup,

  onNavigate,
  navigationState,
}: {
  isDBConnected: boolean,
  currentDBConfig: PouchConfig,
  connectDB: (config: PouchConfig) => void,
  isDBPublic: boolean,
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  anonymousLogin: () => void,
  signup: (username: string, password: string) => void,

  onNavigate: Function,
  navigationState: Object,
}) => {
  const children = navigationState.children;

  if (isDBConnected && loggedIn) {
    return <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />;
  }

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

      {isDBConnected &&
        <LoginForm
          login={login}
          isDBPublic={isDBPublic}
          anonymousLogin={anonymousLogin}
        />
      }

      {isDBConnected &&
        <SignupForm
          signup={signup}
        />
      }

      {!isDBConnected &&
        <DBConfigForm
          defaultValue={currentDBConfig}
          onConnect={(config) => connectDB(config)}
        />
      }
    </View>
  );
};
