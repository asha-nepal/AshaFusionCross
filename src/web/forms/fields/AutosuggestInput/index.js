/* @flow */
import React from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './theme';

type SuggestionsType = Array<string>

type Props = {
  onChange: (value: Object) => void,
  suggestions: SuggestionsType,
}

// TODO: To be more sophisticated
function getSuggestions(candidates: Array<string>, value: string) {
  const inputValue = value.trim().toLowerCase();

  return candidates.filter(c => c.trim().toLowerCase().includes(inputValue));
}

export default class extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      suggestions: [],
    };
  }

  state: {
    suggestions: Array<string>,
  }

  onSuggestionsUpdateRequested = ({ value }: { value: string }) => {
    const {
      suggestions,
    } = this.props;

    this.setState({
      suggestions: getSuggestions(suggestions, value),
    });
  }

  onSuggestionSelected = (event: Object, { suggestion }: { suggestion: string }) => {
    event.preventDefault();
    this.props.onChange({ target: { value: suggestion } });
  }

  props: Props

  render() {
    const {
      suggestions,
      ...inputProps
    } = this.props;

    return (
      <div className="control">
        <Autosuggest
          suggestions={this.state.suggestions}
          getSuggestionValue={s => s}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          renderSuggestion={suggestion => <span>{suggestion}</span>}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
          theme={theme}
        />
      </div>
    );
  }
}
