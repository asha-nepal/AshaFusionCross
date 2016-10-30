/* @flow */

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ICD10Modal from './ICD10Modal';
import { ICD10 } from '../../../../data';

const ICD10Display = ({
  label,
  value,
  onClearRequest,
  size,
  readonly,
  width,
}: {
  label?: ?string,
  value: string,
  onClearRequest: ?() => void,
  size?: string,
  readonly?: boolean,
  width?: string | number,
}) => {
  const sizeClassName = size ? ` is-${size}` : '';
  const icd10Datum = value && ICD10.find(item => item.code === value);

  return (
    <div className="control" style={{ width }}>
      {label && <label className="label">{label}</label>}
      <div className={readonly ? 'level form-static' : 'level'}>
        <span className="level-left">
          <div className={`content${sizeClassName}`}>
            <small style={{ marginRight: '1em' }}>{value || ''}</small>
            {icd10Datum ? icd10Datum.description : ''}
          </div>
        </span>
        {!readonly && onClearRequest &&
          <span className="level-right">
            <a
              className={`button${sizeClassName}`}
              onClick={e => {
                e.preventDefault();
                if (onClearRequest) onClearRequest();
              }}
            ><i className="fa fa-times" /></a>
          </span>
        }
      </div>
    </div>
  );
};

export const getSuggestions = (candidates: Array<{_query: string}>, value: string) => {
  const inputValue = value.trim().toLowerCase();
  if (inputValue.length === 0) { return []; }

  const queries = inputValue.split(' ').filter(q => q.length > 0);

  return candidates.filter(icd10 =>
    queries.every(query => icd10._query.indexOf(` ${query}`) > -1)
  );
};

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
  suggestionFocused: {
    backgroundColor: '#ddd',
  },
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

  onSuggestionsUpdateRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(ICD10, value),
    });
  }

  onSuggestionSelected = (event: Object, { suggestion }: { suggestion: ICD10Type }) => {
    event.preventDefault();
    this.props.onChange(suggestion.code);
  }

  onInputBlur = (event: Object, { focusedSuggestion }: { focusedSuggestion: ICD10Type }) => {
    if (focusedSuggestion) {
      this.props.onChange(focusedSuggestion.code);
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
      <div className="control" style={{ width }}>
        {label && <label className="label">{label}</label>}
        <div className="control has-addons">
          <Autosuggest
            suggestions={this.state.suggestions}
            getSuggestionValue={(suggestion) => suggestion.description}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
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
          <a
            className={`button${sizeClassName}`}
            onClick={e => {
              e.preventDefault();
              this.setState({ isModalOpen: true });
            }}
          ><i className="fa fa-list-alt" /></a>
          <ICD10Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.setState({ isModalOpen: false })}
            onSelect={(code) => {
              this.setState({ isModalOpen: false });
              onChange(code);
            }}
          />
        </div>
      </div>
    );
  }
}
