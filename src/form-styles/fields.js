import math from 'mathjs';

export default {
  record: {
    height: {
      field: 'height',
      label: 'Height',
      class: 'textunitinput',
      type: 'number',
      units: ['ft', 'cm', 'in'],
      precision: 1,
      style: { width: 100 },
    },
    weight: {
      field: 'weight', label: 'Weight', class: 'textunitinput', type: 'number',
      style: { width: 100 }, precision: 1,
      units: ['kg', 'lbm'],
    },
    bmi: {
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
    bp: {
      class: 'block',
      label: 'Blood pressure',
      children: [
        {
          field: 'bp.s',
          class: 'textinput', placeholder: 'sBP',
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
          field: 'bp.d',
          class: 'textinput', placeholder: 'dBP',
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
    pulse: {
      field: 'pulse',
      label: 'Pulse', class: 'textinput', type: 'number',
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
    temperature: {
      field: 'temperature', label: 'Temperature', class: 'textunitinput', type: 'number',
      style: { width: 60 },
      units: ['degF', 'degC'],
      precision: 1,
    },
    spo2: {
      field: 'spo2', label: 'SpO2', class: 'textinput', type: 'number',
      style: { width: 60 }, suffix: '%',
      min: 0, max: 100, precision: 0,
      alerts: [
        { type: 'danger', label: 'Alert', range: [null, 80] },
        { type: 'warning', label: 'Low', range: [80, 95] },
        { type: 'success', label: 'Normal', range: [95, null] },
      ],
    },
    rr: {
      field: 'rr', label: 'Respiration rate', class: 'textinput', type: 'number',
      style: { width: 60 }, suffix: '/min',
      min: 1, precision: 0,
    },
    bs: {
      field: 'bs', label: 'Blood sugar', class: 'textinput', type: 'number',
      style: { width: 60 }, suffix: 'mg/dL',
      min: 1, precision: 0,
    },
    signs_select: {
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
  },
};
