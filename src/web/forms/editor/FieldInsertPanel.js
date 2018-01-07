import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

function splitIndex(path: string): [string, number] {
  const match = path.match(/(.*)\[(\d+)]$/);
  return [match[1], parseInt(match[2], 10)];
}

const editableFieldTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    const [fromParentPath, fromIndex] = splitIndex(item.moveFrom);

    props.onFieldMove(
      fromParentPath,
      fromIndex
    );
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const FieldInsertPanel = ({
  onFieldInsert,

  connectDropTarget,
  isOver,
}) => connectDropTarget(
  <div
    className={classNames(
      'form-editor-drop-target',
      {
        hover: isOver,
      }
    )}
    onClick={e => {
      e.preventDefault();

      const field = {  // FIXME: tmp
        label: '(New field)',
        class: 'textinput',
      };

      onFieldInsert(field);
    }}
  />
);

export default DropTarget(
  'editable-field', editableFieldTarget, collect
)(
  FieldInsertPanel
);
