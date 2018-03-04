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
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  alert: {
    padding: 5,
    marginBottom: 2,
    borderRadius: 5,
    backgroundColor: '#f00a',
  },
  error: {
    backgroundColor: '#f00a',
  },
  info: {
    backgroundColor: '#0afa',
  },
  alertMessage: {
    color: '#fff',
    fontSize: 12,
  },
});

export default function Alerts({ alerts }: { alerts: Array<Alert> }) {
  if (!alerts || alerts.length === 0) { return null; }

  return (
    <View style={styles.container}>
    {alerts.map(alert =>
      <View key={alert.id} style={[styles.alert, styles[alert.type]]}>
        <Text style={styles.alertMessage}>{alert.message}</Text>
      </View>
    )}
    </View>
  );
}
