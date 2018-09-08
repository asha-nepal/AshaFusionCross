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
import Autosuggest from 'react-autosuggest';
import _omit from 'lodash.omit';
import theme from './theme';

type SuggestionsType = Array<string>

type Props = {
  onChange: (value: Object) => void,
  candidates: SuggestionsType,
}

// For forward match
const canonifyString = (value: string): string => ` ${value.trim().toLowerCase()}`;

// TODO: To be more sophisticated
const getSuggestions = (canonicalCandidates: Array<[string, string]>, value: string) => {
  const canonicalValue = canonifyString(value);

  return canonicalCandidates.filter(cs => cs[0].startsWith(canonicalValue)).map(cs => cs[1]);
};

const canonifyCandidates = (candidates: Array<string>): Array<[string, string]> =>
  candidates.map((c, i) => [canonifyString(c), candidates[i]]);

export default class extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      suggestions: [],
      candidates: [],
    };
  }

  state: {
    suggestions: Array<string>,
    candidates: Array<[string, string]>,  // [canonicalCandidates, originalCandidates]
  }

  componentWillMount = () => {
    this.setState({
      candidates: canonifyCandidates(this.props.candidates),
    });
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (this.props.candidates !== nextProps.candidates) {
      this.setState({
        candidates: canonifyCandidates(nextProps.candidates),
      });
    }
  }

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(this.state.candidates, value),
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionSelected = (event: Object, { suggestion }: { suggestion: string }) => {
    event.preventDefault();
    this.props.onChange({ target: { value: suggestion } });
  }

  onInputChange = (event: Object, { newValue }: { newValue: string }) => {
    this.props.onChange({ target: { value: newValue } });
  }

  props: Props

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={s => s}
        renderSuggestion={suggestion => <span>{suggestion}</span>}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={{
          ..._omit(this.props, 'candidates'),
          onChange: this.onInputChange,
        }}
        theme={theme}
      />
    );
  }
}
