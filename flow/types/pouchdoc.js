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

interface PouchDocType {
  _id: string,
  _rev: string,
  _attachments?: Object,
}

export type PatientObject = PouchDocType & {
  type: string,
  name: string,
  age?: number,
  sex?: number,
  address?: string,
  number?: number,
}

export type RecordObject = PouchDocType & {
  type: string,
  $created_at: ?number,
  $updated_at: ?number,
  $initialized_at: ?number,
}

export type UserObject = PouchDocType & {
  type: string,
  name: string,
  roles: Array<string>,
  asha?: {
    roles: Array<string>,
  },
}
