/* @flow */
import React from 'react';
import type { FieldEditPropsType } from './type';

export default ({
  children,
  fieldEditProps,
  style,
  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
  style?: Object,
}) => {
  if (!fieldEditProps) {
    return <div style={style} {...props}>{children}</div>;
  }

  return (
    <div
      {...props}
      style={{
        ...style,
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        if (fieldEditProps) fieldEditProps.onFocus();
      }}
    >{children}{fieldEditProps.fieldEditor}</div>
  );
};
