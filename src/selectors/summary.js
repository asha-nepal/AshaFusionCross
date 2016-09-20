/* @flow */
import _get from 'lodash.get';
import { convert } from '../web/forms/fields/TextUnitInput';  // TODO: 適切なモジュールに切り出す

export const flattenRow = (data: Object, columns: Array<Object>) => {
  const row = {};

  columns.forEach(column => {
    const originalValue = _get(data, column.field);

    switch (column.class) {
      case 'textunitinput':
        row[column.field] = convert(originalValue, column.unit);
        break;

      case 'check':
        row[column.field] = originalValue ? 'Yes' : 'No';
        break;

      case 'checkgroup':
        row[column.field] =
          originalValue && originalValue
          .map(val => {
            const option = column.options && column.options.find(opt => opt.id === val);
            return option ? option.label : val;
          })
          .join(', ');
        break;

      case 'multiinput':
        row[column.field] =
          originalValue && originalValue.join(', ');
        break;

      case 'diagnoses':
        row[column.field] =
          originalValue && originalValue
          .map(diagnosis => diagnosis.icd10 || diagnosis.text)
          .join(', ');
        break;

      case 'timestamp':
        row[column.field] =
          originalValue && (new Date(originalValue)).toString();
        break;

      default:
        row[column.field] = originalValue;
        break;
    }
  });

  return row;
};

export const tablize = (data: Array<Object>, columns: Array<Object>) =>
  data.map(datum => flattenRow(datum, columns));
