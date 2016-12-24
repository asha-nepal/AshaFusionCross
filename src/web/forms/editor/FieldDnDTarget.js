import React from 'react';
import { DropTarget } from 'react-dnd';

const editableFieldTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    console.log(`Move ${item.moveFrom} to ${props.path}`);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget('editable-field', editableFieldTarget, collect)(({
  connectDropTarget,
  isOver,
}) => connectDropTarget(
  <div
    style={{
      minWidth: 10,
      minHeight: 10,
      backgroundColor: isOver ? 'red' : null,
    }}
  ></div>
));
