/* @flow */
import React from 'react';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';
import type { FieldEditPropsType } from './type';

const editableFieldSource = {
  beginDrag(props) {
    return {
      moveFrom: props.fieldEditProps.path,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const EditableFieldWrapper = ({
  children,
  fieldEditProps,
  className,
  style,

  connectDragSource,
  isDragging,

  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
  className?: string,
  style?: Object,

  connectDragSource: Function,
  isDragging: boolean,
}) => {
  if (!fieldEditProps) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  let child;
  try {
    child = React.Children.only(children);
  } catch (e) {
    child = <div>{children}</div>;
  }

  return (
    <div
      {...props}
      className={classNames(
        className,
        'form-editor-drag-source',
        {
          dragging: isDragging,
        }
      )}
      style={{
        ...style,
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        if (fieldEditProps) fieldEditProps.onFocus();
      }}
    >
      {connectDragSource(child)}
      {fieldEditProps.fieldEditor}
    </div>
  );
};

export default DragSource('editable-field', editableFieldSource, collect)(EditableFieldWrapper);
