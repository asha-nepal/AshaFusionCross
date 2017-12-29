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

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ICD10Modal from './ICD10Modal';
import ICD10Display from './ICD10Display';
import { getICD10 } from '../../../../../data';
import theme from './theme';


export const getSuggestions = (candidates: Array<{_query: string}>, value: string) => {
  const inputValue = value.trim().toLowerCase();
  if (inputValue.length === 0) { return []; }

  const queries = inputValue.split(' ').filter(q => q.length > 0);

  return candidates.filter(icd10 =>
    queries.every(query => icd10._query.indexOf(` ${query}`) > -1)
  );
};

type Props = {
  label?: ?string,
  value: string,
  onChange: (newValue: ?string) => void,
  placeholder?: string,
  size?: string,
  readonly?: boolean,
  width?: string | number,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      isModalOpen: false,
    };
  }

  state: {
    value: string,
    suggestions: Array<Object>,
    isModalOpen: boolean,
  }

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(getICD10(), value),
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionSelected = (event: Object, { suggestion }: { suggestion: ICD10Type }) => {
    event.preventDefault();
    this.props.onChange(suggestion.code);
  }

  onInputBlur = (
    event: Object,
    { highlightedSuggestion }: { highlightedSuggestion: ICD10Type }
  ) => {
    if (highlightedSuggestion) {
      this.props.onChange(highlightedSuggestion.code);
    }
  }

  onInputChange = (event: Object, { newValue }: { newValue: string }) => {
    this.setState({ value: newValue });
  }

  props: Props

  render() {
    const {
      label,
      value,
      onChange,
      placeholder,
      size,
      readonly,
      width,
    } = this.props;

    if (value || readonly) {
      return (
        <ICD10Display
          label={label}
          value={value}
          onClearRequest={() => {
            onChange(null);
            this.setState({ value: '' });
          }}
          size={size}
          readonly={readonly}
          width={width}
        />
      );
    }

    const sizeClassName = size ? ` is-${size}` : '';

    return (
      <div className="field" style={{ width }}>
        {label && <label className="label">{label}</label>}
        <div className="field has-addons">
          <div className="control">
            <Autosuggest
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={(suggestion) => suggestion.description}
              renderSuggestion={(suggestion) => (
                <span><small>{suggestion.code}</small>{` ${suggestion.description}`}</span>
              )}
              onSuggestionSelected={this.onSuggestionSelected}
              inputProps={{
                className: `input${sizeClassName}`,
                placeholder,
                value: this.state.value,
                onBlur: this.onInputBlur,
                onChange: this.onInputChange,
              }}
              theme={theme}
            />
          </div>
          <div className="control">
            <a
              className={`button${sizeClassName}`}
              onClick={e => {
                e.preventDefault();
                this.setState({ isModalOpen: true });
              }}
            ><i className="fa fa-list-alt" /></a>
          </div>
        </div>

        <ICD10Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          onSelect={(code) => {
            this.setState({ isModalOpen: false });
            onChange(code);
          }}
        />
      </div>
    );
  }
}
