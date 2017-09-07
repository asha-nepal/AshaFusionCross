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

import _ICD10 from '../../../assets/data/icd10.json';
import _dhulikhelICD10 from '../../../assets/data/dhulikhel-icd10.json';
import { sortICD10 } from './sorter';

const ICD10 = sortICD10(_ICD10.concat(_dhulikhelICD10));

export const getICD10 = () => ICD10;
