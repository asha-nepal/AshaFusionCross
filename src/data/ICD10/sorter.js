/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';

export const sortICD10 = (rawICD10) =>
  sortBy(uniqBy(rawICD10, 'code'), 'code')
  .map(item => ({
    ...item,
    _query: ` ${item.code} ${item.description}`.toLowerCase(),  // suggestion検索用 / 前方一致用にスペース入れる
  }));
