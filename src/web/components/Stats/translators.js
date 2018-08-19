import { getICD10 } from '../../../data';

export default {
  'asha.icd10': (code) => {
    const icd10 = getICD10().find(item => item.code === code);
    return icd10 ? `[${code}] ${icd10.description}` : null;
  },
};
