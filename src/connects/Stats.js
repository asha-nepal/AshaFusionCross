/* @flow */

import { connect } from 'react-redux';
import { tableize } from 'lib/tableizer';

// Dummy data
const records = [
  {
    patient: {
      name: 'John',
    },
    height: { value: 5.8, unit: 'ft' },
    bp: { s: 120, d: 75 },
  },
  {
    patient: {
      name: 'Mike',
    },
    height: { value: 180, unit: 'cm' },
    bp: { s: 130, d: 80 },
  },
];

const rules = [
  {
    key: 'name',
    entry: 'patient.name',
  },
  {
    key: 'height',
    type: 'value_unit',
    unit: 'cm',
  },
  {
    key: 'bp.s',
  },
  {
    key: 'bp.d',
  },
];

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'height', name: 'Height' },
  { key: 'bp.s', name: 'BP (s)' },
  { key: 'bp.d', name: 'BP (d)' },
];

const mapStateToProps = () => ({
  columns,
  rows: tableize(records, rules),
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps);
