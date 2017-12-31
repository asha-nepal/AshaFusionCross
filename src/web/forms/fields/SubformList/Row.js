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
import type { FormFieldDefinition } from '.';
import { checkVisibility } from '../../utils';

import { TextInputComponent } from '../TextInput';
import { CheckboxComponent } from '../Checkbox';
import { RadioGroupComponent } from '../RadioGroup';
import { SelectComponent } from '../Select';

const fieldComponents = {
  textinput: TextInputComponent,
  check: CheckboxComponent,
  radio: RadioGroupComponent,
  select: SelectComponent,
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
  onChange?: (newValue: Object) => void,
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
          <div className="columns is-multiline is-variable is-1">
          {fields.map((field, i) => {
            if (typeof field.show !== 'undefined'
              && !checkVisibility(_value, null, field.show)) {
              return null;
            } else if (typeof field.hide !== 'undefined'
              && checkVisibility(_value, null, field.hide)) {
              return null;
            }

            const component = typeof field.class === 'string'
              ? fieldComponents[field.class] : field.class;

            const element = React.createElement(component, {
              ...field,
              readonly,
              size: 'small',
              value: _value[field.field],
              onChange: (v => {
                if (!onChange) { return; }

                const updated = {};
                updated[field.field] = v;

                onChange({
                  ..._value,
                  ...updated,
                });
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
