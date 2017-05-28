import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';

export const sortICD10 = (rawICD10) =>
  sortBy(uniqBy(rawICD10, 'code'), 'code')
  .map(item => ({
    ...item,
    _query: ` ${item.code} ${item.description}`.toLowerCase(),  // suggestion検索用 / 前方一致用にスペース入れる
  }));
