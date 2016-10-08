/* @flow */

import React, { Component } from 'react';

import { ICD10 } from '../../../../data';

import ICD10Input from './ICD10Input';

type Props = {
  onDiagnosisAdded: Function,
};

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      icd10: undefined,
      text: undefined,
    };
  }

  state: {
    icd10: ?string,
    text: ?string,
  };

  props: Props;

  addDiagnosis() {
    this.props.onDiagnosisAdded({
      icd10: this.state.icd10,
      text: this.state.text,
    });

    this.setState({
      icd10: undefined,
      text: undefined,
    });
  }

  render() {
    const isValueInvalid = !this.state.icd10 && !this.state.text;

    return (
      <div className="columns">
        <div className="column">
          {this.state.icd10 ? (
            <div className="level">
              <span className="level-left">
                <small style={{ marginRight: '1em' }}>{this.state.icd10}</small>
                {(() => {
                  const icd10 = ICD10.find(row => row.code === this.state.icd10);
                  return icd10 && icd10.description;
                })()}
              </span>
              <div className="level-right">
                <a
                  className="button"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ icd10: undefined });
                  }}
                >
                  <i className="fa fa-times" />
                </a>
              </div>
            </div>
          ) : (
            <ICD10Input
              placeholder="ICD-10"
              onChange={(code) => {
                this.setState({ icd10: code });
                this.refs.newtext.focus();
              }}
            />
          )}
        </div>

        <div className="column">
          <input
            ref="newtext"
            type="text"
            className="input"
            placeholder="Free description"
            value={this.state.text || ''}
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
            onKeyPress={e => {
              if (e.which === 13) {
                this.addDiagnosis();
              }
            }}
          />
        </div>

        <div className="column is-narrow">
          <a
            className={isValueInvalid ? 'button is-primary is-disabled' : 'button is-primary'}
            onClick={e => {
              e.preventDefault();
              if (isValueInvalid) { return; }

              this.addDiagnosis();
            }}
          ><i className="fa fa-plus" /></a>
        </div>
      </div>
    );
  }
}
