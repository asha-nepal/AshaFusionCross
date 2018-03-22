/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import _get from 'lodash.get';

import { convert } from '../../forms/fields/TextUnitInput';

function getStr(obj: Object, path: string, defaultValue: string = ''): string {
  const value = _get(obj, path, defaultValue);

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return `${value.value} ${value.unit}`;
  }

  return '';
}

export default ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => {
  const timestamp = record.$created_at || record.$initialized_at;
  const date = timestamp && new Date(timestamp);
  const number = _get(patient, 'number');
  const pulse = _get(record, 'pulse');
  const height = convert(_get(record, 'height'), 'ft', 1);

  const weight = convert(_get(record, 'weight'), 'kg', 1);
  const abdomenIsAbnormal = _get(record, 'abdomen_is_abnormal');
  const abdomenDescription = abdomenIsAbnormal ? _get(record, 'abdomen_result_details') : '';
  const complaints = _get(record, 'symptoms');
  const complaintsDetails = () => {
    if (complaints === 'abnormal_vaginal_discharge') {
      return ` (${_get(record, 'vaginal_discharge_detail')})`;
    }
    if (complaints === 'other_symptoms') {
      return ` (${_get(record, 'other_symptoms_detail')})`;
    }
    return '';
  };
  const cervixIsUnhealthy = _get(record, 'cervix_is_unhealthy', null);
  const cervixConsistency = _get(record, 'cervix_consistency');
  const uterusTip = _get(record, 'uterus_tip');
  const uterusSize = _get(record, 'uterus_size');
  const uterusAdnexa = _get(record, 'uterus_adnexa');
  const perVaginalIsVisible = uterusTip || uterusSize || uterusAdnexa;
  const management = _get(record, 'management');
  return (
    <div>
      <section className="section">
        <div className="hero has-text-centered">
          <h1 className="title">Cervical Cancer Screening</h1>
          <h2 className="subtitle">Manmohan Community Hospital</h2>
          <h3 className="title is-6">{date && date.toDateString()}</h3>
        </div>
      </section>
      <section className="section">
        <h3 className="title is-4">No.{number || '---'}</h3>
        <h3 className="title subtitle">{_get(patient, 'name')}</h3>
        <p className="is-left print-info-group">
          <span>
            Age: <strong>{getStr(patient, 'age') || '---'}</strong>
          </span>
          <span>
            Address: <strong>{_get(patient, 'address') || '---'}</strong>
          </span>
        </p>
        <p className="is-left print-info-group">
          <span>
            Height: <strong>{height ? `${height} ft` : '---'}</strong>
          </span>
          <span>
            Weight: <strong>{weight ? `${weight} kg` : '---'}</strong>
          </span>
          <span>
            Pulse: <strong>{pulse ? `${pulse} /min` : '---'}</strong>
          </span>
          <span>Blood Pressure:
            <strong>{getStr(record, 'bp.s', '---')} / {getStr(record, 'bp.d', '---')} mmHg</strong>
          </span>
        </p>
        {complaints &&
          <p className="is-left print-info-group">
            Major Complaints:
            <strong>
              {{
                none: 'None', pain_abdomen: 'Pain in abdomen', other_symptoms: 'Others',
                coital_bleeding: 'Post coital bleeding',
                abnormal_vaginal_discharge: 'Abnormal vaginal discharge',
              }[complaints]}
            </strong>
            <strong>{complaintsDetails()}</strong>
          </p>
        }
        <br />
        <h3 className="title is-4">Examinations</h3>
        <p>
          Result of abdomen examination:
          <strong>{abdomenIsAbnormal ? `Abnormal(${abdomenDescription})` : 'Normal'}</strong>
        </p>
        <br />
        {(cervixIsUnhealthy !== null) &&
          <div className="content">
            <h3 className="title is-5">Per speculum</h3>
            <ul>
              <li>Cervix:
                <strong>{cervixIsUnhealthy ? 'Unhealthy' : 'Healthy'}</strong>
                {cervixIsUnhealthy &&
                  <strong> ({_get(record, 'cervix_problem')})</strong>
                }
              </li>
              <li>Consistency: <strong> {cervixConsistency || '---'}</strong></li>
            </ul>
          </div>
        }
        {(perVaginalIsVisible) &&
          <div className="content">
            <h3 className="title is-5">Per vaginal</h3>
            <ul>
              <li>Uterus: <strong>{uterusTip || '---'}</strong></li>
              <li>Size: <strong>{uterusSize || '---'}</strong></li>
              <li>Adnexa: <strong>{uterusAdnexa || '---'}</strong></li>
            </ul>
          </div>
        }
        <h3 className="title is-4">Management</h3>
        <p>Management of patient:
          <strong>
            {{
              counselling_only: 'Counselling only',
              counselling_with_medication: 'Counselling with medication',
              referral: 'Referral to higher center',
              others: 'Others',
            }[management]}
          </strong>
          {(management === 'others') &&
            <strong> ({_get(record, 'other_management_details')})</strong>
          }
        </p>
        <br />
        {(management === 'counselling_with_medication') &&
          <div className="has-text-centered">
            <strong>Precriptions</strong>
            <table className="table is-striped">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Stat</th>
                  <th>SOS</th>
                  <th>Dose(pcs)</th>
                  <th>Frequency(times)</th>
                  <th>Duration(days)</th>
                  <th>Route</th>
                  <th>Meal</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {_get(record, 'prescriptions').map((prescription) => (
                  <tr>
                    <td><p className="has-text-centered">{prescription.medicine}</p></td>
                    <td><p className="has-text-centered">{prescription.stat ? 'Y' : 'N'}</p></td>
                    <td><p className="has-text-centered">{prescription.sos ? 'Y' : 'N'}</p></td>
                    <td><p className="has-text-centered">{prescription.dose}</p></td>
                    <td><p className="has-text-centered">{prescription.freq}</p></td>
                    <td><p className="has-text-centered">{prescription.duration}</p></td>
                    <td><p className="has-text-centered">{prescription.route}</p></td>
                    <td>
                      <p className="has-text-centered">
                        {{
                          before: 'Before meal',
                          after: 'After meal',
                        }[prescription.meal]}
                      </p>
                    </td>
                    <td><p className="has-text-centered">{prescription.remark}</p></td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  );
};
