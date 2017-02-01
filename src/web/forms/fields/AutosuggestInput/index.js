/* @flow */
import React from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
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

  onSuggestionsUpdateRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(this.state.candidates, value),
    });
  }

  onSuggestionSelected = (event: Object, { suggestion }: { suggestion: string }) => {
    event.preventDefault();
    this.props.onChange({ target: { value: suggestion } });
  }


  props: Props

  render() {
    return (
      <div className="control">
        <Autosuggest
          suggestions={this.state.suggestions}
          getSuggestionValue={s => s}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          renderSuggestion={suggestion => <span>{suggestion}</span>}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={_.omit(this.props, 'candidates')}
          theme={theme}
        />
      </div>
    );
  }
}
