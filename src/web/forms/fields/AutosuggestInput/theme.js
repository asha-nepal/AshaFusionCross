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

export default {
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestionsList: {
    position: 'absolute',
    width: '100%',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 1999,
    maxHeight: '14em',
    overflow: 'scroll',
  },
  input: {
    width: '100%',
  },
  suggestion: {
    cursor: 'pointer',
    lineHeight: '1.6em',
    padding: '0 0.5em',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
};
