/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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

import styles from './styles.json';
import medicines from '../../../../../data/dhulikhel-medicine-list-brandnames.json';

styles
  .record
  .find(s => s.id === 'physical')
  .style
  .find(s => s.field === 'prescription')
  .fields
  .find(s => s.field === 'medicine')
  .suggestions
    = medicines;

export default styles;
