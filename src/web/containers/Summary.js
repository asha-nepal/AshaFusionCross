/* @flow */

import { connect } from 'react-redux';
import _get from 'lodash.get';
import {
  fetchRecordList,
} from '../../actions';
import Summary from '../components/Summary';

import { convert } from '../forms/fields/TextUnitInput';

const columns = [
  { field: 'height', label: 'Height', class: 'textunitinput', unit: 'cm' },
  { field: 'weight', label: 'Weight', class: 'textunitinput', unit: 'kg' },
  { field: 'bp.s', class: 'textinput' },
  { field: 'bp.d', class: 'textinput' },
  { field: 'allergy', class: 'check' },
  { field: 'signs_select', class: 'checkgroup',
    options: [
      { id: 'jaundice', label: 'Jaundice' },
      { id: 'anemia', label: 'Anemia' },
      { id: 'lymphadenopathy', label: 'Lymphadenopathy' },
      { id: 'cyanosis', label: 'Cyanosis' },
      { id: 'clubbing', label: 'Clubbing' },
      { id: 'oedema', label: 'Oedema' },
      { id: 'dehydration', label: 'Dehydration' },
    ],
  },
  { field: 'symptoms', label: 'Symptoms', class: 'multiinput' },
  { field: 'diagnoses', label: 'Diagnoses', class: 'diagnoses' },
];

const tablize = (records) => records.map(record => {
  const transformed = {};
  columns.forEach(column => {
    const originalValue = _get(record, column.field);

    switch (column.class) {
      case 'textunitinput':
        transformed[column.field] = convert(originalValue, column.unit);
        break;

      case 'check':
        transformed[column.field] = originalValue ? 'Yes' : 'No';
        break;

      case 'checkgroup':
        transformed[column.field] =
          originalValue && originalValue
          .map(val => {
            const option = column.options && column.options.find(opt => opt.id === val);
            return option ? option.label : val;
          })
          .join(', ');
        break;

      case 'multiinput':
        transformed[column.field] =
          originalValue && originalValue.join(', ');
        break;

      case 'diagnoses':
        transformed[column.field] =
          originalValue && originalValue
          .map(diagnosis => diagnosis.icd10 || diagnosis.text)
          .join(', ');
        break;

      default:
        transformed[column.field] = originalValue;
        break;
    }
  });

  return {
    ...record,
    ...transformed,
  };
});

const mapStateToProps = (state) => ({
  columns,
  records: state.summary.records ? tablize(state.summary.records) : [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecords: () => dispatch(fetchRecordList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
