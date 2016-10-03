import _ICD10 from '../../assets/data/icd10.json';
export const ICD10 = Object.keys(_ICD10).sort().map(code => ({
  code,
  description: _ICD10[code],
  _query: ` ${code} ${_ICD10[code]}`.toLowerCase(),  // suggestion検索用 / 前方一致用にスペース入れる
}));
