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

import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  textfield: {
    height: 28, // have to do it on iOS
  },
  textfieldPrefix: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  columns: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  radioGroupRow: {
    flexDirection: 'row',
  },
  radioGroupCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7,
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
