/* @flow */

import { connect } from 'react-redux';
import {
  fetchRecordList,
} from '../../actions';
import {
  tablize,
} from '../../selectors';
import Summary from '../components/Summary';

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
  { field: '$created_at', label: 'Created at', class: 'timestamp' },
];

const mapStateToProps = (state) => ({
  columns,
  records: state.summary.records ? tablize(state.summary.records, columns) : [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecords: () => dispatch(fetchRecordList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
