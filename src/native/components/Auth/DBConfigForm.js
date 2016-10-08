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

const ColoredRaisedConnectButton = MKButton.coloredButton()
  .withText('Connect')
  .build();

type Props = {
  onConnect: (config: PouchConfig) => void,
  defaultValue: PouchConfig,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      hostname: '',
      dbname: '',
    };
  }

  state: {
    hostname: string,
    dbname: string,
  }

  componentWillMount() {
    this.setState({
      hostname: this.props.defaultValue.remote.hostname,
      dbname: this.props.defaultValue.remote.dbname,
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        hostname: nextProps.defaultValue.remote.hostname,
        dbname: nextProps.defaultValue.remote.dbname,
      });
    }
  }

  props: Props

  render() {
    const {
      onConnect,
      defaultValue,
    } = this.props;

    return (
      <View>
        <TextField
          autoCapitalize="none"
          placeholder="Host"
          value={this.state.hostname}
          onChangeText={hostname => this.setState({ hostname })}
        />

        <TextField
          autoCapitalize="none"
          placeholder="DB name"
          value={this.state.dbname}
          onChangeText={dbname => this.setState({ dbname })}
        />

        <ColoredRaisedConnectButton
          onPress={() => {
            const config = Object.assign({}, defaultValue, {
              remote: {
                hostname: this.state.hostname,
                dbname: this.state.dbname,
              },
            });

            onConnect(config);
          }}
        />
      </View>
    );
  }
}
