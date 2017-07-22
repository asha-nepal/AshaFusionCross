import _ICD10 from '../../../assets/data/icd10.json';
import _dhulikhelICD10 from '../../../assets/data/dhulikhel-icd10.json';
import { sortICD10 } from './sorter';

const ICD10 = sortICD10(_ICD10.concat(_dhulikhelICD10));

export const getICD10 = () => ICD10;
