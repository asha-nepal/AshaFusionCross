/* @flow */

import React from 'react';
import _get from 'lodash.get';

import { convert } from '../../forms/fields/TextUnitInput';
import { TextArea } from '../../forms/fields/TextArea';
import { MultiInput } from '../../forms/fields/MultiInput';
import { MultiDoubleInput } from '../../forms/fields/MultiDoubleInput';
import { CheckGroup } from '../../forms/fields/CheckGroup';
import { Diagnoses } from '../../forms/fields/Diagnoses';


export default ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => {
//  const patientModel = 'activePatient';
  const recordModel = 'activeRecords[0]';

  const precision = 2;
  const e = Math.pow(10, precision);

  const number = _get(patient, 'number');

  const heightMeter = convert(_get(record, 'height'), 'm', 1);
  const heightFoot = convert(_get(record, 'height'), 'ft', 1);
  const weight = convert(_get(record, 'weight'), 'kg', 1);
  const bmi = heightMeter && weight && (weight / Math.pow(heightMeter, 2));
  const bmiRounded = bmi && Math.round(bmi * e) / e;
  const temperature = convert(_get(record, 'temperature'), 'degF', 1);

  return (
    <section className="section is-print">
      <div className="container">
        <h1 className="title">
          {number && <small>No. {number} </small>}
          {_get(patient, 'name')}
        </h1>
        <h2 className="subtitle">
          <p>Age: {_get(patient, 'age')}</p>
          <p>Sex: {{ male: 'Male', female: 'Female' }[_get(patient, 'sex')]}</p>
          <p>Address: {_get(patient, 'address')}</p>
        </h2>

        <div className="control is-grouped">
          <div className="control">
            <label className="label">Height</label>
            <p className="form-static">{heightFoot ? `${heightFoot} ft` : '---'}</p>
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
            <p className="form-static">
              {_get(record, 'bp.s', '---')} / {_get(record, 'bp.d', '---')} mmHg
            </p>
          </div>
          <div className="control">
            <label className="label">Pulse</label>
            <p className="form-static">{_get(record, 'pulse', '---')} /min</p>
          </div>
          <div className="control">
            <label className="label">Temperature</label>
            <p className="form-static">{temperature ? `${temperature} degF` : '---'}</p>
          </div>
          <div className="control">
            <label className="label">SpO2</label>
            <p className="form-static">{_get(record, 'spo2', '---')} %</p>
          </div>
          <div className="control">
            <label className="label">Respiration rate</label>
            <p className="form-static">{_get(record, 'rr', '---')} /min</p>
          </div>
          <div className="control">
            <label className="label">Blood sugar</label>
            <p className="form-static">{_get(record, 'bs', '---')} mg/dL</p>
          </div>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <th>Allergy</th>
              <td>{_get(record, 'allergy') ? (
                <div>
                  <strong>&lt;Yes&gt;</strong>
                  <TextArea
                    model={`${recordModel}.allergy_memo`}
                    readonly
                  />
                </div>
              ) : '---'}</td>
            </tr>
            <tr>
              <th>Past medical history</th>
              <td>
                <TextArea
                  model={`${recordModel}.past_medical_history`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Current medicines</th>
              <td>
                <TextArea
                  model={`${recordModel}.current_medicine`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Present medical history</th>
              <td>
                <TextArea
                  model={`${recordModel}.present_medical_history`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Current medicines</th>
              <td>
                <TextArea
                  model={`${recordModel}.current_medicine`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Symptoms</th>
              <td>
                <MultiInput
                  model={`${recordModel}.symptoms`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Signs</th>
              <td>
                <CheckGroup
                  model={`${recordModel}.signs_select`}
                  options={[
                    { id: 'jaundice', label: 'Jaundice' },
                    { id: 'anemia', label: 'Anemia' },
                    { id: 'lymphadenopathy', label: 'Lymphadenopathy' },
                    { id: 'cyanosis', label: 'Cyanosis' },
                    { id: 'clubbing', label: 'Clubbing' },
                    { id: 'oedema', label: 'Oedema' },
                    { id: 'dehydration', label: 'Dehydration' },
                  ]}
                  readonly
                />
                <TextArea
                  model={`${recordModel}.signs`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Diagnoses</th>
              <td>
                <Diagnoses
                  model={`${recordModel}.diagnoses`}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Prescriptions</th>
              <td>
                <MultiDoubleInput
                  model={`${recordModel}.prescriptions`}
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
