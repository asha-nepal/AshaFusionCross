export default {
  record: {
    normal: [
      {
        field: 'height', label: 'Height',
      },
      {
        field: 'weight', label: 'Weight',
      },
      {
        field: 'waist', label: 'Waist',
      },
      {
        field: 'medicalHistory', label: 'Medical history', type: 'textarea',
      },
      {
        field: 'currentMedicine', label: 'Current medicines', type: 'textarea',
      },
    ],
    ksix: [
      {
        field: 'ksix.nervious',
        label: 'Nervious?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
      {
        field: 'ksix.hopeless',
        label: 'Hopeless?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
      {
        field: 'ksix.restless',
        label: 'Restless or fidgety?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
      {
        field: 'ksix.depressed',
        label: 'So depressed that nothing could cheer you up?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
      {
        field: 'ksix.effort',
        label: 'That everything was an effort?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
      {
        field: 'ksix.worthless',
        label: 'Worthless?',
        type: 'radio',
        options: [
          { id: 4, label: 'All of the time (4)' },
          { id: 3, label: 'Most of the time (3)' },
          { id: 2, label: 'Some of the time (2)' },
          { id: 1, label: 'A little of the time (1)' },
          { id: 0, label: 'None of the time (0)' },
        ],
      },
    ],
  },
};
