/* @flow */
import React from 'react';
import { DragSource } from 'react-dnd';
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
  style,

  connectDragSource,
  isDragging,

  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
  style?: Object,

  connectDragSource: Function,
  isDragging: boolean,
}) => {
  if (!fieldEditProps) {
    return <div style={style} {...props}>{children}</div>;
  }

  return connectDragSource(
    <div
      {...props}
      style={{
        ...style,
        position: 'relative',

        backgroundColor: isDragging ? 'yellow' : null,
      }}
      onClick={e => {
        e.preventDefault();
        if (fieldEditProps) fieldEditProps.onFocus();
      }}
    >{children}{fieldEditProps.fieldEditor}</div>
  );
};

export default DragSource('editable-field', editableFieldSource, collect)(EditableFieldWrapper);
