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

type FormField = {
  field: string,
  model: string,
  class: string,
  label?: string,
  style?: Object,
  children?: Array<FormField>,
  show?: boolean | string,
}

export type TextAreaProps = FormField & {
  placeholder: ?string,
}

export type RadioGroupProps = FormField & {
  options: Array<{id: string, label: string}>,
}

export type AttachmentProps = FormField & {
  rootModel: string,
  accept: ?string,
  multiple: ?boolean,
}

export type CheckboxProps = FormField;
