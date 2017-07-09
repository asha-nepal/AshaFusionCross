import { sortICD10 } from './sorter';

let ICD10 = [];

import('../../../assets/data/dhulikhel-icd10.json')
.then((_dhulikhelICD10) => {
  ICD10 = sortICD10(_dhulikhelICD10);
});

export const getICD10 = () => ICD10;
