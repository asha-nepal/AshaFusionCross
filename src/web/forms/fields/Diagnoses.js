/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _ from 'lodash';

import Modal from '../../components/Modal';
import { ICD10 } from '../../../data';

type diagnosisType = {
  icd10: ?string,
};

const DiagnosisModal = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean,
  onClose: () => void,
  onSelect: (diagnosis: diagnosisType) => void,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <div className="box">
      <nav className="panel">
        {Object.keys(ICD10).map(code =>
          <a
            key={code}
            className="panel-block"
            onClick={e => {
              e.preventDefault();
              onSelect({ icd10: code });
            }}
          >
            <small style={{ display: 'inline-block', width: 60 }}>{code}</small>
            {ICD10[code]}
          </a>
        )}
      </nav>
    </div>
  </Modal>
);

class DiagnosesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  state: {
    isModalOpen: boolean,
  };

  props: {
    label: ?string,
    diagnoses: Array<diagnosisType>,
    addDiagnosis: (diagnosis: diagnosisType) => void,
    removeDiagnosis: (index: number) => void,
  };

  render() {
    const {
      label,
      diagnoses,
      addDiagnosis,
      removeDiagnosis,
    } = this.props;

    return (
      <div>
        <div className="control">
          {label && <label className="label">{label}</label>}
          <table className="table">
            <thead>
              <tr>
                <th>ICD-10 Code</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {diagnoses.map((diagnosis, i) =>
              <tr key={i}>
                <td>{diagnosis.icd10}</td>
                <td>{ICD10[diagnosis.icd10]}</td>
                <td className="is-icon">
                  <a
                    onClick={e => {
                      e.preventDefault();
                      removeDiagnosis(i);
                    }}
                  >
                    <i className="fa fa-times" />
                  </a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <button
            className="button"
            onClick={e => {
              e.preventDefault();
              this.setState({ isModalOpen: true });
            }}
          >ADD</button>
        </div>
        <DiagnosisModal
          isOpen={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          onSelect={(diagnosis) => {
            addDiagnosis(diagnosis);
            this.setState({ isModalOpen: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  diagnoses: _.get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addDiagnosis: (diagnosis) => dispatch(actions.push(ownProps.model, diagnosis)),
  removeDiagnosis: (index) => dispatch(actions.remove(ownProps.model, index)),
});

export const Diagnoses = connect(
  mapStateToProps, mapDispatchToProps
)(DiagnosesComponent);
