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
            {
              field: 'allergy', label: 'Allergy', class: 'check',
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
          field: 'symptoms', label: 'Symptoms', class: 'checkgroup',
          options: [
            { id: 'diabetes', label: 'Diabetes' },
            { id: 'high_bp', label: 'High blood pressure' },
          ],
        },
        {
          field: 'symptoms', label: 'Symptoms', class: 'textarea',
        },
        {
          field: 'attachments.images', label: 'Images', class: 'attachment',
          accept: 'image/*', multiple: true,
        },
      ],
    },
    {
      id: 'mental',
      label: 'Mental',
      style: [
        {
          class: 'accordion',
          label: 'Accompanying person',
          children: [
            {
              field: 'mental.accompany',
              class: 'radio',
              options: [
                { id: 'mother', label: 'Mother' },
                { id: 'father', label: 'Father' },
                { id: 'daughter', label: 'Daughter' },
                { id: 'son', label: 'Son' },
                { id: 'family', label: 'Other family member' },
                { id: 'healthcare', label: 'Health-care personnel' },
                { id: 'others', label: 'Others' },
              ],
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Incentive for counseling',
          children: [
            {
              field: 'mental.incentive',
              class: 'radio',
              options: [
                { id: 'own', label: 'Client\'s own motivation' },
                { id: 'referral', label: 'Medical referral' },
                { id: 'suggestion', label: 'At other\'s suggestion' },
                { id: 'others', label: 'Others' },
              ],
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Chief complient',
          children: [
            {
              field: 'mental.complient', class: 'textarea',
              placeholder: 'Ex. “I cannot sleep well and cannot concentrate on daily tasks.”',
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Present illness',
          children: [
            {
              field: 'mental.illness', class: 'textarea',
              /* eslint-disable max-len */
              placeholder: `Ex. He is a 23-year-old male for whom psychiatric evaluation is requested due to depressive mood in the past few weeks. He denies any suicidal thoughts. He admits to morning sickness symptom of anorexia, and difficulty falling + staying asleep. He also admits that he lost his house dog on Monday.
Otherwise: (-) apparent hallucinations or delusions, (-) trauma, (-) fever, (-) headache, (-) substance abuse`,
              /* eslint-enable max-len */
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Family history',
          children: [
            {
              field: 'mental.family', class: 'textarea',
              /* eslint-disable max-len */
              placeholder: 'Ex. His immediate family consists of his father (age 51), his mother (age 49), one older brother (age 26), and one younger sister (age 19). His father suffers from alcohol dependence.',
              /* eslint-enable max-len */
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Marital history',
          children: [
            {
              field: 'mental.is_married', label: 'Married status', class: 'radio',
              options: [
                { id: true, label: 'Married' },
                { id: false, label: 'Unmarried' },
              ],
            },
            {
              field: 'mental.family_num', class: 'textinput', type: 'number',
              label: 'Number of live-in family members',
              style: { width: 100 },
              suffix: 'person(s)',
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Personal history history',
          children: [
            { field: 'mental.birthplace', label: 'Birthplace', class: 'textinput' },
            { field: 'mental.ethnicity', label: 'Ethnicity', class: 'textinput' },
            {
              field: 'mental.education', label: 'Education', class: 'textinput',
              placeholder: 'Ex. Attended high school but no graduation',
            },
            {
              field: 'mental.work', label: 'Work experience', class: 'textinput',
              placeholder: 'Ex. Farm helper (2 years), Unstable work history',
            },
            {
              field: 'mental.lifeevents', label: 'Significant life events', class: 'textinput',
              placeholder: 'Ex. Attacked by a great earthquake when he was 23',
            },
            { field: 'mental.personality', label: 'Personality', class: 'textinput' },
            { field: 'mental.religion', label: 'Religion/Belief', class: 'textinput' },
          ],
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
