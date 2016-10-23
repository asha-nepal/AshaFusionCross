import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';

import _dhulikhelICD10 from '../../assets/data/dhulikhel-icd10.json';

export const ICD10 = sortBy(uniqBy(_dhulikhelICD10, 'code'), 'code')
  .map(item => ({
    ...item,
    _query: ` ${item.code} ${item.description}`.toLowerCase(),  // suggestion検索用 / 前方一致用にスペース入れる
  }));
