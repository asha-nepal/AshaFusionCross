import prescriptions from '../../../../../data/dhulikhel-medicine-list.json';

export default {
  patient: [
    {
      style: [
        { field: 'name', label: 'Name', class: 'textinput', required: true },
        {
          class: 'block',
          children: [
            { field: 'age', label: 'Age', class: 'textinput' },
            { field: 'address', label: 'Address', class: 'textinput' },
          ],
        },
        { field: 'education', label: 'Education', class: 'textinput' },
        { field: 'has_been_married',
          label: 'Has the patient ever been married?', class: 'radio',
          options: [
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ],
        },
        { field: 'age_first_marriage', show: 'has_been_married',
          label: 'At what age did the patient have the first marriage?',
          class: 'textinput', type: 'number' },
        { field: 'history_of_smoking', label: 'History of smoking', class: 'textinput' },
        { field: 'children', label: 'Living children / abortion', class: 'textinput' },
        { field: 'menstrual_period', label: 'Last menstrual period', class: 'textinput' },
        { field: 'previous_Pap_smear', label: 'Has the patient had Pap smear before?',
          class: 'radio',
          options: [
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ],
        },
        { field: 'previous_Pap_smear_detail', show: 'previous_Pap_smear',
          label: 'Please specify', class: 'textarea',
          placeholder: 'When? Was the result normal or abnormal? If the latter, how?',
        },
        { field: 'previous_cervical_intervention',
          label: 'Has the patient had cervical intervention before?', class: 'radio',
          options: [
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ],
        },
        {
          field: 'previous_cervical_intervention_detail', show: 'previous_cervical_intervention',
          label: 'Please specify', class: 'textarea',
          placeholder: 'When? What kind?',
        },
        {
          field: 'cervical_cancer_history', label: 'Is there family history of cervical cancer?',
          class: 'radio',
          options: [
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ],
        },
      ],
    },
  ],
  record: [
    {
      id: 'treatment',
      label: 'Treatment',
      style: [
        {
          class: 'accordion',
          label: 'Reported symptoms',
          children: [
            { field: 'symptoms', label: 'Complaint of', class: 'radio',
              options: [
                { id: 'none', label: 'None' },
                { id: 'pain_abdomen', label: 'Pain in abdomen' },
                { id: 'vaginal_discharge', label: 'Abnormal vaginal discharge' },
                { id: 'coital_bleeding', label: 'Post coital bleeding' },
                { id: 'other_symptoms', label: 'Others' },
              ],
            },
            { field: 'vaginal_discharge_detail', label: 'Please specify',
              class: 'textarea', show: 'symptoms:vaginal_discharge',
            },
            { field: 'other_symptoms_detail', label: 'Please specify',
              class: 'textarea', show: 'symptoms:other_symptoms',
              placeholder: 'Describe the symptom(s)',
            },
          ],
        },
        {
          class: 'accordion',
          label: 'Examinations',
          children: [
            {
              field: 'weight', label: 'Weight', class: 'textunitinput', type: 'number',
              style: { width: 100 },
              units: ['kg', 'lbm'],
            },
            {
              class: 'block', label: 'Blood Pressure',
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
              class: 'accordion', label: 'Per abdomen Eexamination',
              children: [
                {
                  field: 'abdomen_is_abnormal', label: 'Result of abdomen examination was',
                  class: 'radio',
                  options: [
                    { id: false, label: 'Normal' },
                    { id: true, label: 'Abnormal' },
                  ],
                },
                {
                  field: 'abdomen_result_details', label: 'Please specify',
                  class: 'textarea', show: 'abdomen_is_normal',
                },
              ],
            },
            {
              class: 'accordion', label: 'Per speculum examination',
              children: [
                {
                  field: 'cervix_is_unhealthy', label: 'Cervix',
                  class: 'radio',
                  options: [
                    { id: false, label: 'Healthy' },
                    { id: true, label: 'Unhealthy' },
                  ],
                },
                {
                  field: 'cervix_problem', label: 'Problem',
                  class: 'checkgroup', show: 'cervix_is_unhealthy',
                  options: [
                    { id: 'ectropion', label: 'Ectropion' },
                    { id: 'growth', label: 'Growth' },
                    { id: 'polyp', label: 'Polyp' },
                  ],
                },
                {
                  field: 'cervix_consistency', label: 'Consistency', class: 'radio',
                  options: [
                    { id: 'firm', label: 'Firm' },
                    { id: 'soft', label: 'Soft' },
                  ],
                },
              ],
            },
            {
              class: 'accordion', label: 'Per vaginal examination',
              children: [
                {
                  field: 'uterus', label: 'Uterus',
                  options: [
                    { id: 'anterverted', label: 'Anterverted' },
                    { id: 'retroverted', label: 'Retroverted' },
                  ],
                },
                {
                  field: 'size', label: 'Size',
                  options: [
                    { id: 'normal', label: 'Normal' },
                    { id: 'bulky', label: 'Bulky' },
                  ],
                },
                {
                  field: 'adnexa', label: 'Adnexa',
                  options: [
                    { id: 'normal', label: 'Normal' },
                    { id: 'mass', label: 'Mass' },
                  ],
                },
              ],
            },
          ],
        },
        {
          class: 'accordion', label: 'Management',
          children: [
            {
              field: 'management', label: 'Management of patient', class: 'radio',
              options: [
                { id: 'counselling_only', label: 'Counselling only' },
                { id: 'counselling_with_medication', label: 'Counselling with medication' },
                { id: 'referral', label: 'Referral to higher center' },
                { id: 'others', label: 'Others' },
              ],
            },
            {
              field: 'other_management_details', label: 'Please specify',
              class: 'textarea', show: 'management:others',
            },
          ],
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
              label: 'BMI', class: 'autocalc', style: { width: 50 }, precision: 2,
              func: 'asha:bmi',
              inputs: ['height', 'weight'],
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
          field: 'plan', label: 'Plan', class: 'checkgroup',
          options: [
            { id: 'prescription', label: 'Prescription' },
            { id: 'refer', label: 'Refer' },
            { id: 'test', label: 'Test' },
            { id: 'advice', label: 'Advice' },
          ],
        },
        {
          field: 'prescription', label: 'Prescriptions', class: 'subformlist',
          show: 'plan:prescription',
          ditto: true,
          fields: [
            {
              field: 'medicine', label: 'Medicine', class: 'textinput', primary: true,
              suggestions: prescriptions.map(p => p.BRANDNAME),
            },
            { field: 'stat', label: 'Stat', class: 'check' },
            { field: 'sos', label: 'SOS', class: 'check' },
            {
              field: 'dose', class: 'textinput', type: 'number', style: { width: 50 },
              label: 'Dose', suffix: 'pcs',
            },
            {
              field: 'freq', class: 'textinput', type: 'number', style: { width: 50 },
              label: 'Frequency', suffix: 'times', hide: 'sos|stat',
            },
            {
              field: 'duration', class: 'textinput', type: 'number', style: { width: 60 },
              label: 'Duration', suffix: 'days', hide: 'sos|stat',
            },
            {
              field: 'route', class: 'select', label: 'Route',
              options: [
                { id: 'po', label: 'PO' },
                { id: 'ih', label: 'IH' },
                { id: 'pr', label: 'PR' },
                { id: 'sc', label: 'SC' },
                { id: 'sl', label: 'SL' },
                { id: 'top', label: 'TOP' },
              ],
            },
            {
              field: 'meal', class: 'select', label: 'Meal',
              options: [
                { id: 'before', label: 'Before the meal' },
                { id: 'after', label: 'After the meal' },
              ],
            },
            {
              field: 'use_remark', class: 'check', label: 'Remark',
            },
            {
              field: 'remark', class: 'textinput', label: 'Remark', expanded: true,
              show: 'use_remark',
            },
          ],
        },
        {
          field: 'refer', label: 'Refer', class: 'textarea',
          show: 'plan:refer',
        },
        {
          field: 'test', label: 'Test', class: 'textarea',
          show: 'plan:test',
        },
        {
          field: 'advice', label: 'Advice', class: 'textarea',
          show: 'plan:advice',
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
