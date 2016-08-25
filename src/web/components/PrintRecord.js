/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import _get from 'lodash.get';

import { convert } from '../forms/fields/TextUnitInput';
import { TextAreaComponent } from '../forms/fields/TextArea';
import { MultiInputComponent } from '../forms/fields/MultiInput';
import { CheckGroupComponent } from '../forms/fields/CheckGroup';
import { DiagnosesComponent } from '../forms/fields/Diagnoses';

const Body = ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => {
  const precision = 2;
  const e = Math.pow(10, precision);

  const height = convert(_get(record, 'height'), 'cm', 1);
  const weight = convert(_get(record, 'weight'), 'kg', 1);
  const bmi = height && weight && (weight / Math.pow(height / 100, 2));
  const bmiRounded = bmi && Math.round(bmi * e) / e;
  const temperature = convert(_get(record, 'temperature'), 'degF', 1);

  return (
    <section className="section is-print">
      <div className="container">
        <h1 className="title">{_get(patient, 'name')}</h1>
        <h2 className="subtitle">
          <p>Age: {_get(patient, 'age')}</p>
          <p>Sex: {{ male: 'Male', female: 'Female' }[_get(patient, 'sex')]}</p>
          <p>Address: {_get(patient, 'address')}</p>
        </h2>

        <div className="control is-grouped">
          <div className="control">
            <label className="label">Height</label>
            <p className="form-static">{height ? `${height} cm` : '---'}</p>
          </div>
          <div className="control">
            <label className="label">Weight</label>
            <p className="form-static">{weight ? `${weight} kg` : '---'}</p>
          </div>
          <div className="control">
            <label className="label">BMI</label>
            <p className="form-static">{bmiRounded || '---'}</p>
          </div>
        </div>
        <div className="control is-grouped">
          <div className="control">
            <label className="label">Blood pressure</label>
            <p className="form-static">{_get(record, 'bp.s')} / {_get(record, 'bp.d')} mmHg</p>
          </div>
          <div className="control">
            <label className="label">Pulse</label>
            <p className="form-static">{_get(record, 'pulse')} /min</p>
          </div>
          <div className="control">
            <label className="label">Temperature</label>
            <p className="form-static">{temperature ? `${temperature} degF` : '---'}</p>
          </div>
          <div className="control">
            <label className="label">SpO2</label>
            <p className="form-static">{_get(record, 'spo2')} %</p>
          </div>
          <div className="control">
            <label className="label">Respiration rate</label>
            <p className="form-static">{_get(record, 'rr')} /min</p>
          </div>
          <div className="control">
            <label className="label">Blood sugar</label>
            <p className="form-static">{_get(record, 'bs')} mg/dL</p>
          </div>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <th>Allergy</th>
              <td>{_get(record, 'allergy') ? (
                <div>
                  <strong>&lt;Yes&gt;</strong>
                  <TextAreaComponent
                    value={_get(record, 'allergy_memo')}
                    readonly
                  />
                </div>
              ) : '---'}</td>
            </tr>
            <tr>
              <th>Medical history</th>
              <td>
                <TextAreaComponent
                  value={_get(record, 'medical_history')}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Current medicines</th>
              <td>
                <TextAreaComponent
                  value={_get(record, 'current_medicine')}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Symptoms</th>
              <td>
                <CheckGroupComponent
                  value={_get(record, 'symptoms_select')}
                  options={[
                    { id: 'diabetes', label: 'Diabetes' },
                    { id: 'high_bp', label: 'High blood pressure' },
                  ]}
                  readonly
                />
                <MultiInputComponent
                  values={_get(record, 'symptoms')}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Diagnoses</th>
              <td>
                <DiagnosesComponent
                  diagnoses={_get(record, 'diagnoses')}
                  readonly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ({
  patient,
  record,
  className,
}: {
  patient: PatientObject,
  record: RecordObject,
  className: ?string,
}) => (
  <span className={className}>
    <a
      className="icon"
      onClick={e => {
        e.preventDefault();

        const printWindow = window.open('/print.html');
        if (printWindow) {
          printWindow.onload = () => {
            ReactDOM.render(
              <Body patient={patient} record={record} />,
              printWindow.document.getElementById('root'),
              () => {
                printWindow.focus();
                printWindow.print();
//                printWindow.close();
              }
            );
          };
        }
      }}
    ><i className="fa fa-print" /></a>
  </span>
);
