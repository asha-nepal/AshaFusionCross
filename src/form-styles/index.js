export default {
  record: [
    {
      id: 'normal',
      label: 'Normal',
      style: [
        {
          class: 'block',
          children: [
            {
              field: 'height', label: 'Height', class: 'textunitinput', type: 'number',
              units: ['cm', 'in'],
              style: { width: 100 },
            },
            {
              field: 'weight', label: 'Weight', class: 'textunitinput', type: 'number',
              style: { width: 100 },
              units: ['kg', 'lbm'],
            },
            {
              field: 'waist', label: 'Waist', class: 'textunitinput', type: 'number',
              style: { width: 100 },
              units: ['cm', 'in'],
            },
          ],
        },
        {
          class: 'block',
          children: [
            {
              field: 'pulse', label: 'Pulse', class: 'textinput', type: 'number',
              style: { width: 100 },
              suffix: '/min',
            },
            {
              field: 'temperature', label: 'Temperature', class: 'textinput', type: 'number',
              style: { width: 100 },
              units: ['degC', 'degF'],
            },
            {
              field: 'spo2', label: 'SpO2', class: 'textinput', type: 'number',
              style: { width: 100 },
              suffix: '%',
            },
          ],
        },
        {
          class: 'block',
          children: [
            {
              field: 'medicalHistory', label: 'Medical history', class: 'textarea',
              style: { width: '50%' },
            },
            {
              field: 'currentMedicine', label: 'Current medicines', class: 'textarea',
              style: { width: '50%' },
            },
          ],
        },
        {
          field: 'symptoms', label: 'Symptoms', class: 'textarea',
        },
        {
          field: 'attachments.images', label: 'Attachments', class: 'attachment',
          accept: 'image/*', multiple: true,
        },
      ],
    },
    {
      id: 'ksix',
      label: 'K6',
      style: [
        {
          field: 'ksix.nervious',
          label: 'Nervious?',
          class: 'radio',
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
          class: 'radio',
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
          class: 'radio',
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
          class: 'radio',
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
          class: 'radio',
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
          class: 'radio',
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
  ],
};
