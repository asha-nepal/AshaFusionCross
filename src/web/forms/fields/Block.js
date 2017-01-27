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
Block.isUnbound = true;
