import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';

import _ICD10 from '../../assets/data/icd10.json';

export const ICD10 = sortBy(uniqBy(_ICD10, 'code'), 'code').map(item => ({
  ...item,
  _query: ` ${item.code} ${item.description}`.toLowerCase(),  // suggestion検索用 / 前方一致用にスペース入れる
}));
