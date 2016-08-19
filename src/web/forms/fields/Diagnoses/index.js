/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

import { ICD10 } from '../../../../data';

import DiagnosisInput from './DiagnosisInput';

type diagnosisType = {
  icd10: ?string,
  text: ?string,
};

export const DiagnosesComponent = ({
  label,
  diagnoses,
  addDiagnosis,
  removeDiagnosis,
}: {
  label: ?string,
  diagnoses: Array<diagnosisType>,
  addDiagnosis: (diagnosis: diagnosisType) => void,
  removeDiagnosis: (index: number) => void,
}) => (
  <div>
    <div className="control">
      {label && <label className="label">{label}</label>}
      <table className="table">
        <thead>
          <tr>
            <th>ICD-10 Code</th>
            <th>Description</th>
            <th>Text</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {diagnoses && diagnoses.map && diagnoses.map((diagnosis, i) =>
          <tr key={i}>
            <td>{diagnosis.icd10}</td>
            <td>{ICD10[diagnosis.icd10]}</td>
            <td>{diagnosis.text}</td>
            <td>
              <a
                className="button is-danger"
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
    </div>
    <DiagnosisInput
      onDiagnosisAdded={addDiagnosis}
    />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  diagnoses: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addDiagnosis: (diagnosis) => dispatch(actions.push(ownProps.model, diagnosis)),
  removeDiagnosis: (index) => dispatch(actions.remove(ownProps.model, index)),
});

export const Diagnoses = connect(
  mapStateToProps, mapDispatchToProps
)(DiagnosesComponent);
