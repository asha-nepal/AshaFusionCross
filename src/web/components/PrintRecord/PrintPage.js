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


import {
  ImageTemplate,
  createText,
  Table,
  Row,
  Col,
} from './absolute_positioning';
import ANCimg1 from '../../../../assets/img/anc_1.jpg';

const Text = createText(3.5);

const CheckIcon = () => (
  <span className="icon" style={{ height: '5mm' }}>
    <i className="fa fa-check" />
  </span>
);

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
}) => (
  <section className="section is-print">
    <ImageTemplate
      src={ANCimg1}
    >
      <Text x={142} y={70.5}>{getStr(patient, 'name')}</Text>
      <Text x={200} y={70.5}>{getStr(patient, 'age')}</Text>
      <Text x={229} y={70.5}>{getStr(patient, 'ht')}</Text>

      <Text x={142} y={77}>{getStr(patient, 'district')}</Text>
      <Text x={200} y={77}>{getStr(patient, 'municipality_vdc.name')}</Text>
      <Text x={229} y={77}>{getStr(patient, 'municipality_vdc.no')}</Text>

      <Text x={142} y={83}>{getStr(patient, 'area')}</Text>
      <Text x={200} y={83} xScale={0.5}>{getStr(patient, 'contact_number')}</Text>
      <Text x={233} y={83}>{getStr(patient, 'blood_type')}</Text>

      <Text x={170} y={89.5}>{getStr(patient, 'number_of_delivery')}</Text>
      <Text x={200} y={89.5}>{getStr(patient, 'husband_name')}</Text>

      <Table x={132} y={118} fontSize={3.5}>
        {record &&
        record.prev_pregnancy &&
        record.prev_pregnancy.map &&
        record.prev_pregnancy.slice(0, 3).map((item, i) =>
          <Row key={i} height={3.5}>
            <Col width={10}>{i + 1}</Col>
            <Col width={8}>
              {item.living && <CheckIcon />}
            </Col>
            <Col width={8}>
              {item.born_dead && <CheckIcon />}
            </Col>
            <Col width={17}>
              {item.born_before_37_weeks && <CheckIcon />}
            </Col>
            <Col width={10}>
              {item.twins && <CheckIcon />}
            </Col>
            <Col width={11}>
              {item.abortion && <CheckIcon />}
            </Col>
            <Col width={9}>
              {item.living && {
                1: 'M',
                2: 'F',
              }[item.gender]}
            </Col>
            <Col width={10}>
              {item.living &&
                <span
                  style={{
                    display: 'block',
                    transform: 'scale(0.5, 1.0)',
                    transformOrigin: 'top left',
                    width: '9mm',
                  }}
                >
                  {getStr(item, 'age')}
                </span>
              }
            </Col>
            <Col width={10}>
              {item.pregnancy_complication && <CheckIcon />}
            </Col>
            <Col width={10}>
              {item.type_of_delivery &&
                <span
                  style={{
                    display: 'block',
                    transform: 'scale(0.7, 1.0)',
                    transformOrigin: 'top left',
                  }}
                >
                  {{
                    normal: 'Normal',
                    cs: 'CS',
                  }[item.type_of_delivery] || item.type_of_delivery}
                </span>
              }
            </Col>
          </Row>
        )}
      </Table>

      <Text x={143} y={137.5}>{_get(record, 'td_vaccine.regd_no')}</Text>
      {_get(record, 'td_vaccine.first.taken') &&
        <Text x={166} y={137.5} xScale={0.7}>{_get(record, 'td_vaccine.first.date')}</Text>
      }
      {_get(record, 'td_vaccine.second.taken') &&
        <Text x={195} y={137.5} xScale={0.7}>{_get(record, 'td_vaccine.second.date')}</Text>
      }
      {_get(record, 'td_vaccine.after_second.taken') &&
        <Text x={220} y={137.5} xScale={0.7}>{_get(record, 'td_vaccine.after_second.date')}</Text>
      }

      <Text x={132} y={155.5}>
        {`${_get(record, 'health_worker.name', '')} ${_get(record, 'health_worker.surname', '')}`}
      </Text>
      <Text x={167} y={155.5}>
        {_get(record, 'health_worker.designation')}
      </Text>
      <Text x={213} y={155.5}>
        {_get(record, 'health_worker.date')}
      </Text>
      <Text x={132} y={168.5}>
        {_get(record, 'hospital_contact_number')}
      </Text>
      <Text x={203} y={168.5}>
        {_get(record, 'ambulance_contact_number')}
      </Text>
    </ImageTemplate>
  </section>
);
