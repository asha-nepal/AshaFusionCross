/* @flow */

const initialState = {
  tableRules: [
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
    {
      key: 'symptoms',
    },
    {
      key: '$updated_at',
      type: 'moment',
    },
  ],
  tableColumns: [
    { key: 'height', name: 'Height (cm)' },
    { key: 'bp.s', name: 'BP/s (mmHg)' },
    { key: 'bp.d', name: 'BP/d (mmHg)' },
    { key: 'symptoms', name: 'Symptoms' },
    { key: '$updated_at', name: 'Updated at' },
  ],
  statsRules: {
    'height.mean': { name: 'Mean(Height)', entry: 'height', type: 'mean' },
    'height.max': { name: 'Max(Height)', entry: 'height', type: 'max' },
    'height.min': { name: 'Min(Height)', entry: 'height', type: 'min' },
    'symptoms.mode': { name: 'Mode(Symptoms)', entry: 'symptoms', type: 'mode' },
  },
};

export default function (state: Object = initialState, action: PayloadAction<{}>): Object {
  switch (action.type) {
    default:
      return initialState;
  }
}
