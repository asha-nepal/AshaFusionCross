/**
 * Copyright 2018 Yuichiro Tsuchiya
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
import EditableFieldWrapper from '../../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../../editor/type';


export default (Component: ReactClass<any>) => ({
  label,
  fieldEditProps,
  layout,
  ...props
}: {
  label?: string,
  fieldEditProps?: FieldEditPropsType,
  layout?: string,
}) => {
  if (layout === 'horizontal') {
    return (
      <EditableFieldWrapper className="field is-horizontal" fieldEditProps={fieldEditProps}>
        <div className="field-label">
          {label && (
          <label className="label">
            {label}
          </label>
          )}
        </div>
        <div className="field-body">
          <div className="field">
            <Component {...props} />
          </div>
        </div>
      </EditableFieldWrapper>
    );
  }

  return (
    <EditableFieldWrapper className="field" fieldEditProps={fieldEditProps}>
      {label && (
      <label className="label">
        {label}
      </label>
      )}
      <Component {...props} />
    </EditableFieldWrapper>
  );
};
