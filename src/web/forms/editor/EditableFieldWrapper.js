/* @flow */
import React from 'react';
import DraggableFieldEditor from './DraggableFieldEditor';

export default ({
  children,
  fieldEditProps,
  className,
  style,

  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
  className?: string,
  style?: Object,
}) => {
  if (!fieldEditProps) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  return (
    <DraggableFieldEditor
      fieldEditProps={fieldEditProps}
      className={className}
      style={style}
      {...props}
    >{children}</DraggableFieldEditor>
  );
};
