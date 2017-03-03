/* @flow */
import React, { Component } from 'react';

type Props = {
  blob: Blob,
  alt: string,
  onClick: () => void,
}

export default class extends Component {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.blob !== this.props.blob) return true;
    if (nextProps.alt !== this.props.alt) return true;
    // Skip checking equality of onClick

    return false;
  }

  props: Props

  render() {
    const {
      blob,
      alt,
      onClick,
    } = this.props;

    return (
      <a
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      >
        <img src={URL.createObjectURL(blob)} alt={alt} />
      </a>
    );
  }
}
