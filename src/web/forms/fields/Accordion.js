/* @flow */

import React, { Component } from 'react';

type Props = {
  label: ?string,
  children?: ReactElement,
};

export class Accordion extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  state: {
    isOpen: boolean,
  };

  props: Props;

  render() {
    const {
      label,
    } = this.props;

    return (
      <div className="card is-fullwidth control">
        <a
          className="card-header"
          style={{ cursor: 'pointer' }}
          onClick={e => {
            e.preventDefault();
            this.setState({ isOpen: !this.state.isOpen });
          }}
        >
          <p className="card-header-title">
            {label}
          </p>
          <span className="card-header-icon">
            <i className={this.state.isOpen ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
          </span>
        </a>
        <div className="card-content" style={{ display: this.state.isOpen ? null : 'none' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
