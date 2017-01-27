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
  fieldEditProps: FieldEditPropsType,
  className?: string,
  style?: Object,

  connectDragSource: Function,
  isDragging: boolean,
}) => {
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
        e.stopPropagation();
        fieldEditProps.onFocus();
      }}
    >
      {connectDragSource(child)}
      {fieldEditProps.fieldEditor}
    </div>
  );
};

const ConnectedEditableFieldWrapper =
  DragSource('editable-field', editableFieldSource, collect)(EditableFieldWrapper);

export default ({
  children,
  fieldEditProps,

  ...props
}: {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
}) => {
  if (!fieldEditProps) {
    return <div {...props}>{children}</div>;
  }

  return (
    <ConnectedEditableFieldWrapper
      fieldEditProps={fieldEditProps}
      children={children}
      {...props}
    />
  );
};
