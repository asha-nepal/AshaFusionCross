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
