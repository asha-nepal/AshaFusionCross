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
import classNames from 'classnames';
import _get from 'lodash.get';
import type { FormFieldDefinition } from '.';
import { referAndGetBool } from '../../utils';

import { TextInputComponent } from '../TextInput';
import { CheckboxComponent } from '../Checkbox';
import { RadioGroupComponent } from '../RadioGroup';
import { SelectComponent } from '../Select';
import fieldify from '../common/fieldify';

// TODO: 共通化
export const fieldComponents = {
  textinput: fieldify(TextInputComponent),
  check: fieldify(CheckboxComponent),
  radio: fieldify(RadioGroupComponent),
  select: fieldify(SelectComponent),
};

export default ({
  value,
  fields,
  onChange,
  onRemoveItemRequested,
  readonly,
}: {
  value: Object | string,
  fields: Array<FormFieldDefinition>,
  onChange?: (path: ?string, newValue: Object) => void,
  onRemoveItemRequested?: () => void,
  readonly?: boolean,
}) => {
  let _value = {};
  if (typeof value === 'string') {
    // MultiInputからの移行．primary=trueのfieldに当てはめる
    const primaryField = fields.find(f => f.primary);
    if (primaryField) {
      _value[primaryField.field] = value;
    }
  } else {
    _value = value;
  }

  return (
    <div
      className="panel-block"
      style={{ display: 'block' }} // Workaround: https://github.com/jgthms/bulma/issues/812
    >
      <div className="columns is-mobile">
        <div className="column">
          <div className="columns is-mobile is-multiline is-variable is-1">
          {fields.map((field, i) => {
            if (!referAndGetBool(_value, null, field.show, true)) return null;
            if (referAndGetBool(_value, null, field.hide, false)) return null;

            const component = typeof field.class === 'string'
              ? fieldComponents[field.class] : field.class;

            const element = React.createElement(component, {
              ...field,
              readonly,
              size: 'small',
              value: _get(_value, field.field),
              onChange: (v => {
                if (!onChange) { return; }

                onChange(field.field, v);
              }),
            });

            return (
              <div
                key={i}
                className={classNames(
                  'column',
                  { 'is-narrow': i !== fields.length - 1 }
                )}
                style={field.subformstyle}
              >
                {element}
              </div>
            );
          })}
          </div>
        </div>

        {onRemoveItemRequested &&
          <div
            className="column is-narrow"
          >
            <a
              className="delete"
              onClick={e => {
                e.preventDefault();
                if (onRemoveItemRequested) onRemoveItemRequested();
              }}
            />
          </div>
        }
      </div>
    </div>
  );
};
