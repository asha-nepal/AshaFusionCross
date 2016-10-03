/* @flow */

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ICD10Modal from './ICD10Modal';
import { ICD10 } from '../../../../data';


type Props = {
  placeholder: ?string,
  onChange: (newCode: string) => void,
};

export const getSuggestions = (candidates: Array<{_query: string}>, value: string) => {
  const inputValue = value.trim().toLowerCase();
  if (inputValue.length === 0) { return []; }

  const queries = inputValue.split(' ').filter(q => q.length > 0);

  return candidates.filter(icd10 =>
    queries.every(query => icd10._query.indexOf(` ${query}`) > -1)
  ).slice(0, 10);
};

const getSuggestionValue = (suggestion) => suggestion.description;

const renderSuggestion = (suggestion) => (
  <span><small>{suggestion.code}</small>{suggestion.description}</span>
);

const theme = {
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
    zIndex: 2,
  },
  input: {
    width: '100%',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '5px 10px',
  },
  suggestionFocused: {
    backgroundColor: '#ddd',
  },
};

export default class ICD10Input extends Component {
  constructor(props: Props) {
    super(props);

    this._onSuggestionsUpdateRequested = this._onSuggestionsUpdateRequested.bind(this);
    this._onSuggestionSelected = this._onSuggestionSelected.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);

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
  };

  props: Props;

  _onSuggestionsUpdateRequested: (args: { value: string }) => void;
  _onSuggestionSelected: (event: Object, args: { suggestion: ICD10Type }) => void;
  _onInputBlur: (evnet: Object, args: { focusedSuggestion: ICD10Type }) => void;

  _onSuggestionsUpdateRequested({ value }: { value: string }) {
    this.setState({
      suggestions: getSuggestions(ICD10, value),
    });
  }

  _onSuggestionSelected(event: Object, { suggestion }: { suggestion: ICD10Type }) {
    event.preventDefault();
    this.props.onChange(suggestion.code);
  }

  _onInputBlur(event: Object, { focusedSuggestion }: { focusedSuggestion: ICD10Type }) {
    if (focusedSuggestion) {
      this.props.onChange(focusedSuggestion.code);
    }
  }

  render() {
    return (
      <div>
        <div className="control has-addons" style={{ width: '100%' }}>
          <Autosuggest
            suggestions={this.state.suggestions}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsUpdateRequested={this._onSuggestionsUpdateRequested}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={this._onSuggestionSelected}
            inputProps={{
              className: 'input',
              placeholder: this.props.placeholder,
              value: this.state.value,
              onBlur: this._onInputBlur,
              onChange: (e, { newValue }) => {
                this.setState({ value: newValue });
              },
            }}
            theme={theme}
          />
          <a
            className="button"
            onClick={e => {
              e.preventDefault();
              this.setState({ isModalOpen: true });
            }}
          ><i className="fa fa-list-alt" /></a>
        </div>
        <ICD10Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          onSelect={(code) => {
            this.setState({ isModalOpen: false });
            this.props.onChange(code);
          }}
        />
      </div>
    );
  }
}

ICD10Input.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
};
