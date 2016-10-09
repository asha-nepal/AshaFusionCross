/* @flow */

import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  textfield: {
    height: 28,  // have to do it on iOS
    marginBottom: 20,
  },
  radioGroupRow: {
    flexDirection: 'row',
  },
  radioGroupCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  fieldLabel: {
    textAlign: 'center',
    color: '#444444',
    fontSize: 16,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 12,
    fontWeight: '300',
  },
});
