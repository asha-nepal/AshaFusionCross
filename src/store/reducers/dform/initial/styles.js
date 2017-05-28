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
        { field: 'had_previous_Pap_smear', label: 'Has the patient had Pap smear before?',
          class: 'radio',
          options: [
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ],
        },
        { field: 'previous_Pap_smear_detail', show: 'had_previous_Pap_smear',
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
      id: 'gynaecologist',
      label: 'Gynaecologist',
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
      id: 'pathologist',
      label: 'Pathologist',
      style: [
        {
          field: 'Pap_smear_report', label: 'Pap smear report', class: 'checkgroup',
          options: [
            {
              id: 'negative_IL_or_malignancy',
              label: 'Negative for intraepithelial lesion or malignancy',
            },
            {
              id: 'RCC_with_inflammation',
              label: 'Reactive cellular changes associated with inflammation',
            },
            { id: 'ASCUS', label: 'ASCUS' },
            { id: 'AGUS', label: 'AGUS' },
            {
              id: 'LSIL',
              label: 'Low grade squamous intraepithelial lesion (LSIL)',
            },
            {
              id: 'HSIL',
              label: 'High grade squamous intraepithelial lesion (HSIL)',
            },
            { id: 'invasive_carcinoma', label: 'Invasive carcinoma' },
            { id: 'others', label: 'Others' },
          ],
        },
        { field: 'Pap_result_other_details', label: 'Please specify',
          class: 'textarea', show: 'Pap_smear_report:others' },
      ],
    },
  ],
};
