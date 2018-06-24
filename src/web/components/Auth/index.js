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

import React from 'react';
import logo from '../../../../assets/img/logo.svg';

import DBConfigForm from './DBConfigForm';
import LoginForm from './LoginForm';
import SignupForm from '../../containers/forms/SignupForm';

export default ({
  isDBConnected,
  currentDBConfig,
  connectDB,
  isDBPublic,
  loggedIn,
  login,
  anonymousLogin,
  signup,
  children,
}: {
  isDBConnected: boolean,
  currentDBConfig: PouchConfig,
  connectDB: (config: PouchConfig) => void,
  isDBPublic: boolean,
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  anonymousLogin: () => void,
  signup: (username: string, password: string) => void,
  children: React$Element<any>,
}) => {
  if (isDBConnected && loggedIn) return children;

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-half-tablet is-offset-one-quarter-tablet">
            <div className="logo">
              <img className="logo-img" src={logo} alt="ASHA fusion" />
              <h1 className="logo-title">
ASHA fusion
              </h1>
            </div>
          </div>
        </div>

        {!isDBConnected
          && (
          <DBConfigForm
            defaultValue={currentDBConfig}
            onConnect={config => connectDB(config)}
          />
          )
        }

        {isDBConnected
          && (
          <LoginForm
            login={login}
            isDBPublic={isDBPublic}
            anonymousLogin={anonymousLogin}
          />
          )
        }

        {isDBConnected && isDBPublic
          && (
          <SignupForm
            signup={signup}
          />
          )
        }
      </div>
    </section>
  );
};
