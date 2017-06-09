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

type Props = {
  children?: React$Element<any>,
  fieldEditProps?: FieldEditPropsType,
  className?: string,
  style?: Object,

  connectDragSource: Function,
  isDragging: boolean,
}


class DraggableFieldEditor extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  state: {
    hover: boolean,
  };

  props: Props;

  render() {
    const {
      children,
      fieldEditProps,
      className,
      style,

      connectDragSource,
      isDragging,

      ...props
    } = this.props;

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
            hover: this.state.hover && !isDragging,
          }
        )}
        style={{
          ...style,
          position: 'relative',
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (fieldEditProps) fieldEditProps.onFocus();
        }}
        onMouseOver={e => {
          e.stopPropagation();
          this.setState({ hover: true });
        }}
        onMouseOut={e => {
          e.stopPropagation();
          this.setState({ hover: false });
        }}
      >
        {this.state.hover ? connectDragSource(child) : child}
        {fieldEditProps.fieldEditor}
      </div>
    );
  }
}

export default DragSource(
  'editable-field', editableFieldSource, collect
)(DraggableFieldEditor);
