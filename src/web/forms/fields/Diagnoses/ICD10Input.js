/* @flow */

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ICD10Modal from './ICD10Modal';
import { ICD10 } from '../../../../data';


type Props = {
  placeholder: ?string,
  onChange: (newCode: string) => void,
};

type ICD10SuggestionType = {
  code: string,
  description: string,
  query: string,
};

const ICD10suggestions: Array<ICD10SuggestionType> = Object.keys(ICD10).map(code => ({
  code,
  description: ICD10[code],
  query: (code + ICD10[code]).toLowerCase(),  // suggestion検索用
}));

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : ICD10suggestions.filter(suggestion =>
    suggestion.query.indexOf(inputValue) > -1
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
  _onSuggestionSelected: (event: Object, args: { suggestion: ICD10SuggestionType }) => void;

  _onSuggestionsUpdateRequested({ value }: { value: string }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  _onSuggestionSelected(event: Object, { suggestion }: { suggestion: ICD10SuggestionType }) {
    this.props.onChange(suggestion.code);
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
