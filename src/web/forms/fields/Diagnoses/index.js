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
  readonly = false,
}: {
  label: ?string,
  diagnoses: Array<diagnosisType>,
  addDiagnosis: (diagnosis: diagnosisType) => void,
  removeDiagnosis: (index: number) => void,
  readonly: boolean,
}) => (
  <div>
    <div className="control">
      {label && <label className="label">{label}</label>}
      <table className="table">
        <thead>
          <tr>
            <th>ICD-10</th>
            <th>Free description</th>
            {!readonly &&
              <th></th>
            }
          </tr>
        </thead>
        <tbody>
        {diagnoses && diagnoses.map && diagnoses.map((diagnosis, i) =>
          <tr key={i}>
            <td>
              {diagnosis.icd10}{' '}
              {(() => {
                const icd10 = ICD10.find(row => row.code === diagnosis.icd10);
                return icd10 && icd10.description;
              })()}
            </td>
            <td>{diagnosis.text}</td>
            {!readonly &&
              <td className="is-narrow">
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
            }
          </tr>
        )}
        </tbody>
      </table>
    </div>
    {!readonly &&
      <DiagnosisInput
        onDiagnosisAdded={addDiagnosis}
      />
    }
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
