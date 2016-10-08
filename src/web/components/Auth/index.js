/* @flow */

import React from 'react';
import logo from '../../../../assets/img/logo.svg';

import DBConfigForm from './DBConfigForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
              <h1 className="logo-title">ASHA fusion</h1>
            </div>
          </div>
        </div>

        {!isDBConnected &&
          <DBConfigForm
            defaultValue={currentDBConfig}
            onConnect={(config) => connectDB(config)}
          />
        }

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
      </div>
    </section>
  );
};
