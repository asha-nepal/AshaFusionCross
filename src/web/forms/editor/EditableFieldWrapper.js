/* @flow */
import React from 'react';
import type { FieldEditPropsType } from './type';

export default ({
  children,
  fieldEditProps,
  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps: FieldEditPropsType,
}) => {
  if (!fieldEditProps) {
    return <div {...props}>{children}</div>;
  }

  return (
    <div
      {...props}
      style={{
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        fieldEditProps.onFocus();
      }}
    >{children}{fieldEditProps.fieldEditor}</div>
  );
};
