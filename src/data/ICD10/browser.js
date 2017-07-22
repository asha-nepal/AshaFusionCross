import { sortICD10 } from './sorter';

let ICD10 = [];

Promise.all([
  import('../../../assets/data/icd10.json'),
  import('../../../assets/data/dhulikhel-icd10.json'),
])
.then(([_ICD10, _dhulikhelICD10]) => {
  ICD10 = sortICD10(_ICD10.concat(_dhulikhelICD10));
});

export const getICD10 = () => ICD10;
