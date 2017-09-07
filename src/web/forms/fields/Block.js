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

/* @flow */

import React from 'react';

import EditableFieldWrapper from '../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../editor/type';

export const Block = ({
  label,
  children,
  wrap = true,
  fieldEditProps,
}: {
  label?: string,
  children: React$Element<any>,
  wrap?: boolean,
  fieldEditProps?: FieldEditPropsType,
}): React$Element<any> => (
  <EditableFieldWrapper
    className="control"
    fieldEditProps={fieldEditProps}
  >
    {label && <label className="label">{label}</label>}
    <div className="control is-grouped" style={wrap ? { flexWrap: 'wrap' } : {}}>
      {children}
    </div>
  </EditableFieldWrapper>
);

Block.fieldProps = [];
