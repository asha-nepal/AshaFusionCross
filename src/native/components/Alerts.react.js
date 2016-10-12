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
