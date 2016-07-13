/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
});

export default function Alerts({ alerts }: { alerts: Array<Alert> }) {
  return (
    <View style={styles.container}>
    {alerts.map(alert =>
      <Text key={alert.id}>{alert.message}</Text>
    )}
    </View>
  );
}
