/**
 * Copyright 2018 Yuichiro Tsuchiya
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

/**
XXX: This component is just for use in Pharping and MUST NOT be merged into master branch.
There are lot of workarounds and WET code.
**/

import React from 'react';
import _get from 'lodash.get';
import Signature from './Signature';
import {
  checkVisibility,
} from '../../../forms/utils';

// XXX: Bad manner! styles MUST BE accessed only via reducer.
import styles from '../../../../store/reducers/dform/initial/styles.json';

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
const style = styles.record[2].style; // this is pathology rec


const Block = ({
  data,
  block,
}: {
  data: Object,
  block: {
    class: string,
    label: string,
    show: string,
    children?: Array<Object>,
  },
}) => (
  <div>
    <h2 className="subtitle">{block.label}</h2>
    <table className="table">
      <tbody>
        {block.children.map((field, i) => {
          let elements;
          if (field.show == null || checkVisibility(data, '', field.show)) {
            if (field.class === 'block') {
              elements = (
                <tr key={i}>
                  <td colSpan="2">
                    <Block key={i} data={data} block={field} />
                  </td>
                </tr>
              );
            } else {
              elements = (
                <tr key={i}>
                  <th>{field.label}</th>
                  <td>
                    <span className="level">
                      <span className="level-left">
                        {field.prefix}{getStr(data, field.field)}
                      </span>
                      <span className="placeholder">
                      {field.normalRange && ` (${field.normalRange[0]} ~ ${field.normalRange[1]})`}
                      </span>
                      <span className="level-right">
                        <small>{field.suffix}</small>
                      </span>
                    </span>
                  </td>
                </tr>
              );
            }
          }
          return elements;
        }
         )
      }
      </tbody>
    </table>
  </div>
);

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

  return (
    <section
      className="section is-print-form"
      style={{ paddingTop: '3px' }}
    >
      <img src="/assets/manmohan_header.png" alt="Manmohan hospital" />
      <div className="header level">
        <span className="level-left">
          <h1 className="subtitle is-3">
            {number && <small>No. {number} </small>}
            {getStr(patient, 'name')}
          </h1>
        </span>
        <span className="level-right">
          {date && date.toDateString()}
        </span>
      </div>
      {(() => {
        const testsColumn = [];
        const step = 3;
        for (let i = 0; i < style.length; i += step) {
          const testtype = (<div className="columns" key={i}>
          {(style.slice(i, i + step).map((element, index) => (
            <div className="column" key={index}>
              <Block data={record} block={element} />
            </div>
          ))
          )}
          </div>);
          testsColumn.push(testtype);
        }
        return testsColumn;
      })()
      }
      <div
        style={{
          paddingTop: '60px',
        }}
      >
        <Signature />
      </div>
    </section>
  );
};
