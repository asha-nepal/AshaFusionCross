/* @flow */
import React from 'react';
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
    <div className="panel-block">
      <div className="columns is-mobile">
        <div className="column">
          <div className="control is-grouped" style={{ flexWrap: 'wrap' }} >
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

            return React.createElement(component, {
              key: i,
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
          })}
          </div>
        </div>

        {onRemoveItemRequested &&
          <div style={{ position: 'relative' }}>
            <a
              style={{ height: '100%' }}
              className="button is-danger"
              onClick={e => {
                e.preventDefault();
                if (onRemoveItemRequested) onRemoveItemRequested();
              }}
            >
              <i className="fa fa-times" />
            </a>
          </div>
        }
      </div>
    </div>
  );
};
