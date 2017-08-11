/**
 * Copyright 2016 Yuichiro Tsuchiya
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

import { PayloadAction } from './action';

export type DformStyle = List<Map<string, any> | string>

interface DformStyleInsertPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
}

interface DformStyleUpdatePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean,
}

interface DformStyleDeletePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
}

interface DformStyleInsertAction extends PayloadAction<DformStyleInsertPayload> {}
interface DformStyleUpdateAction extends PayloadAction<DformStyleUpdatePayload> {}
interface DformStyleDeleteAction extends PayloadAction<DformStyleDeletePayload> {}

export type DformStyleAction =
  DformStyleInsertAction &
  DformStyleUpdateAction &
  DformStyleDeleteAction
