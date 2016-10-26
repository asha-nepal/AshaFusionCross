import math from 'mathjs';

export default {
  patient: [
    {
      style: [
        { field: 'number', label: 'No.', style: { width: 200 } },
        { field: 'name', label: 'Name', class: 'textinput', required: true },
        {
          class: 'block',
          children: [
            {
              field: 'sex',
              label: 'Sex',
              class: 'radio',
              options: [
                { id: 'male', label: 'Male' },
                { id: 'female', label: 'Female' },
              ],
            },
            {
              field: 'age', label: 'Age', class: 'textunitinput',
              units: ['years', 'months'], precision: 0,
            },
          ],
        },
        { field: 'address', label: 'Address', class: 'textinput' },
        { field: 'tel', label: 'Tel', class: 'textinput' },
        { field: 'ethnicity', label: 'Ethnicity', class: 'textinput' },
      ],
    },
  ],
  record: [
    {
      id: 'reception',
      label: 'Reception',
      style: [
        {
          class: 'block',
          children: [
            {
              field: 'height', label: 'Height', class: 'textunitinput', type: 'number',
              units: ['ft', 'cm', 'in'], precision: 1,
              style: { width: 100 },
            },
            {
              field: 'weight', label: 'Weight', class: 'textunitinput', type: 'number',
              style: { width: 100 }, precision: 1,
              units: ['kg', 'lbm'],
            },
            {
              label: 'BMI', class: 'autocalc', style: { width: 50 },
              inputs: ['height', 'weight'],
              calc: (height, weight) => {
                try {
                  const h = math.unit(height.value, height.unit).toNumber('m');
                  const w = math.unit(weight.value, weight.unit).toNumber('kg');
                  return (w / h ** 2).toFixed(2);
                } catch (e) {
                  return null;
                }
              },
            },
          ],
        },
        {
          class: 'block',
          children: [
            {
              class: 'block',
              label: 'Blood pressure',
              children: [
                {
                  field: 'bp.s', class: 'textinput', placeholder: 'sBP',
                  type: 'number', style: { width: 60 },
                  min: 1, precision: 0,
                  alerts: [
                    { type: 'warning', label: 'Low', range: [null, 100] },
                    { type: 'success', label: 'Normal', range: [100, 140] },
                    { type: 'warning', label: 'High', range: [140, 180] },
                    { type: 'danger', label: 'Alert', range: [180, null] },
                  ],
                },
                {
                  field: 'bp.d', class: 'textinput', placeholder: 'dBP',
                  type: 'number', style: { width: 60 }, suffix: 'mmHg',
                  min: 1, precision: 0,
                  alerts: [
                    { type: 'warning', label: 'Low', range: [null, 60] },
                    { type: 'success', label: 'Normal', range: [60, 90] },
                    { type: 'warning', label: 'High', range: [90, 110] },
                    { type: 'danger', label: 'Alert', range: [110, null] },
                  ],
                },
              ],
            },
            {
              field: 'pulse', label: 'Pulse', class: 'textinput', type: 'number',
              style: { width: 60 },
              suffix: '/min',
              alerts: [
                { type: 'danger', label: 'Alert', range: [null, 35] },
                { type: 'warning', label: 'Low', range: [35, 50] },
                { type: 'success', label: 'Normal', range: [50, 100] },
                { type: 'warning', label: 'High', range: [100, 150] },
                { type: 'danger', label: 'Alert', range: [150, null] },
              ],
            },
            {
              field: 'temperature', label: 'Temperature', class: 'textunitinput', type: 'number',
              style: { width: 60 },
              units: ['degF', 'degC'],
              precision: 1,
            },
            {
              field: 'spo2', label: 'SpO2', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: '%',
              min: 0, max: 100, precision: 0,
              alerts: [
                { type: 'danger', label: 'Alert', range: [null, 80] },
                { type: 'warning', label: 'Low', range: [80, 95] },
                { type: 'success', label: 'Normal', range: [95, null] },
              ],
            },
            {
              field: 'rr', label: 'Respiration rate', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: '/min',
              min: 1, precision: 0,
            },
            {
              field: 'bs', label: 'Blood sugar', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: 'mg/dL',
              min: 1, precision: 0,
            },
            {
              field: 'allergy', label: 'Allergy', class: 'check',
            },
          ],
        },
        {
          field: 'allergy_memo', label: 'Allergy memo', class: 'textarea',
          show: 'allergy',
        },
        {
          class: 'block',
          wrap: false,
          children: [
            {
              field: 'past_medical_history', label: 'Past medical history', class: 'textarea',
              style: { width: '50%' },
            },
            {
              field: 'current_medicine', label: 'Current medicines', class: 'textarea',
              style: { width: '50%' },
            },
          ],
        },
        {
          field: 'present_medical_history', label: 'Present medical history', class: 'textarea',
        },
        {
          field: 'symptoms', label: 'Symptoms', class: 'multiinput',
        },
        {
          field: 'signs_select', label: 'Physical Exams', class: 'checkgroup',
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
        {
          field: 'signs', class: 'textarea',
        },
        {
          field: 'attachments.images', label: 'Images', class: 'attachment',
          accept: 'image/*', multiple: true,
        },
      ],
    },
    {
      id: 'physical',
      label: 'Physician',
      style: [
        {
          class: 'guide',
        },
        {
          class: 'block',
          children: [
            {
              field: 'height', label: 'Height', class: 'textunitinput', type: 'number',
              units: ['ft', 'cm', 'in'],
              style: { width: 100 },
            },
            {
              field: 'weight', label: 'Weight', class: 'textunitinput', type: 'number',
              style: { width: 100 },
              units: ['kg', 'lbm'],
            },
            {
              label: 'BMI', class: 'autocalc', style: { width: 50 },
              inputs: ['height', 'weight'],
              calc: (height, weight) => {
                try {
                  const h = math.unit(height.value, height.unit).toNumber('m');
                  const w = math.unit(weight.value, weight.unit).toNumber('kg');
                  return (w / h ** 2).toFixed(2);
                } catch (e) {
                  return null;
                }
              },
            },
          ],
        },
        {
          class: 'block',
          children: [
            {
              class: 'block',
              label: 'Blood pressure',
              children: [
                {
                  field: 'bp.s', class: 'textinput', placeholder: 'sBP',
                  type: 'number', style: { width: 60 },
                  min: 1, precision: 0,
                  alerts: [
                    { type: 'warning', label: 'Low', range: [null, 100] },
                    { type: 'success', label: 'Normal', range: [100, 140] },
                    { type: 'warning', label: 'High', range: [140, 180] },
                    { type: 'danger', label: 'Alert', range: [180, null] },
                  ],
                },
                {
                  field: 'bp.d', class: 'textinput', placeholder: 'dBP',
                  type: 'number', style: { width: 60 }, suffix: 'mmHg',
                  min: 1, precision: 0,
                  alerts: [
                    { type: 'warning', label: 'Low', range: [null, 60] },
                    { type: 'success', label: 'Normal', range: [60, 90] },
                    { type: 'warning', label: 'High', range: [90, 110] },
                    { type: 'danger', label: 'Alert', range: [110, null] },
                  ],
                },
              ],
            },
            {
              field: 'pulse', label: 'Pulse', class: 'textinput', type: 'number',
              style: { width: 60 },
              suffix: '/min',
              alerts: [
                { type: 'danger', label: 'Alert', range: [null, 35] },
                { type: 'warning', label: 'Low', range: [35, 50] },
                { type: 'success', label: 'Normal', range: [50, 100] },
                { type: 'warning', label: 'High', range: [100, 150] },
                { type: 'danger', label: 'Alert', range: [150, null] },
              ],
            },
            {
              field: 'temperature', label: 'Temperature', class: 'textunitinput', type: 'number',
              style: { width: 60 },
              units: ['degF', 'degC'],
              precision: 1,
            },
            {
              field: 'spo2', label: 'SpO2', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: '%',
              min: 0, max: 100, precision: 0,
              alerts: [
                { type: 'danger', label: 'Alert', range: [null, 80] },
                { type: 'warning', label: 'Low', range: [80, 95] },
                { type: 'success', label: 'Normal', range: [95, null] },
              ],
            },
            {
              field: 'rr', label: 'Respiration rate', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: '/min',
              min: 1, precision: 0,
            },
            {
              field: 'bs', label: 'Blood sugar', class: 'textinput', type: 'number',
              style: { width: 60 }, suffix: 'mg/dL',
              min: 1, precision: 0,
            },
            {
              field: 'allergy', label: 'Allergy', class: 'check',
            },
          ],
        },
        {
          field: 'allergy_memo', label: 'Allergy memo', class: 'textarea',
          show: 'allergy',
        },
        {
          class: 'block',
          wrap: false,
          children: [
            {
              field: 'past_medical_history', label: 'Past medical history', class: 'textarea',
              style: { width: '50%' },
            },
            {
              field: 'current_medicine', label: 'Current medicines', class: 'textarea',
              style: { width: '50%' },
            },
          ],
        },
        {
          field: 'present_medical_history', label: 'Present medical history', class: 'textarea',
        },
        {
          field: 'symptoms', label: 'Symptoms', class: 'multiinput',
        },
        {
          field: 'signs_select', label: 'Physical Exams', class: 'checkgroup',
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
        {
          field: 'signs', class: 'textarea',
        },
        {
          field: 'diagnoses', label: 'Diagnoses', class: 'diagnoses',
        },
        {
          field: 'prescription', label: 'Prescriptions', class: 'subformlist',
          fields: [
            { field: 'freetext', label: 'Medicine', class: 'textinput', primary: true },
            { field: 'stat', label: 'Stat', class: 'check' },
            { field: 'sos', label: 'SOS', class: 'check' },
            {
              field: 'once_pcs', class: 'textinput', type: 'number', style: { width: 50 },
              label: 'Once', suffix: 'pcs',
            },
            {
              field: 'daily_times', class: 'textinput', type: 'number', style: { width: 50 },
              label: 'Daily', suffix: 'times', show: 'sos',
            },
            {
              field: 'days', class: 'textinput', type: 'number', style: { width: 60 },
              label: 'Days', suffix: 'days', show: 'sos',
            },
            {
              field: 'meal', class: 'radio',
              options: [
                { id: 'before', label: 'Before the meal' },
                { id: 'after', label: 'After the meal' },
              ],
            },
          ],
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
          label: 'क) आत्तिने ,कहालिने ,डराउने वा मुटु दुकदुक हुने हुनुभएको थियो ? (Nervious?)',
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
        {
          field: 'ksix.hopeless',
          label: 'ख) भविष्यमा केही पनि गर्न सक्दिन भनेर हरेस खानुभएको थियो ? (Hopeless?)',
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
        {
          field: 'ksix.restless',
          /* eslint-disable max-len */
          label: 'ग )छटपटी हुने ,एक ठाउँमा स्थिर भएर बास्न नसक्ने वा कहाँ जाउँ के गरूँ जस्तो हुनुभएको थियो ? (Restless or fidgety?)',
          /* eslint-enable max-len */
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
        {
          field: 'ksix.depressed',
          /* eslint-disable max-len */
          label: 'घ) तपाईंको मनमा भएको दिक्दारिपन ,उदासिपन वा खिन्नताले गर्दा कुनैपनि कुराले केही गरेपनि खुसी हुननसक्ने हनुभएको थियो ? (So depressed that nothing could cheer you up?)',
          /* eslint-enable max-len */
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
        {
          field: 'ksix.effort',
          /* eslint-disable max-len */
          label: 'ङ्) जे काम गर्दापनि एकदमै जाँगर नलागिकन जबर्जस्ती गर्न परेको जस्तो लागेको थियो ? (That everything was an effort?)',
          /* eslint-enable max-len */
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
        {
          field: 'ksix.worthless',
          label: 'च) आफुलाई काम नलाग्ऩे बेकारको मान्छे जस्तो ठान्नुभएको थियो ? (Worthless?)',
          class: 'radio',
          options: [
            { id: 4, label: 'संध (4)' },
            { id: 3, label: 'धेरैजसो (3)' },
            { id: 2, label: 'कहिलेकाहीं बिरैले (2)' },
            { id: 1, label: 'एकदम कम मात्र (1)' },
            { id: 0, label: 'कहिल्यै पनि भएन (0)' },
          ],
        },
      ],
    },
  ],
};
