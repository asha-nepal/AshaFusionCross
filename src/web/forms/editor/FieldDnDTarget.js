import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import {
  dformStyleInsert,
  dformStyleMove,
} from '../../../actions';

function splitIndex(path) {
  const match = path.match(/(.*)\[(\d+)]$/);
  return [match[1], parseInt(match[2], 10)];
}

const editableFieldTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    const [fromParentPath, fromIndex] = splitIndex(item.moveFrom);
    const [toParentPath, toIndex] = splitIndex(props.path);

    props.moveField(
      'record',  // FIXME: tmp
      'reception',  // FIXME: tmp
      fromParentPath,
      fromIndex,
      toParentPath,
      toIndex,
    );
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const mapDispatchToProps = dispatch => ({
  addField: (group, id, parentPath, index, field) =>
    dispatch(dformStyleInsert(group, id, parentPath, index, field)),
  moveField: (group, id, fromParentPath, fromIndex, toParentPath, toIndex) =>
    dispatch(dformStyleMove(group, id, fromParentPath, fromIndex, toParentPath, toIndex)),
});

const FieldDnDTarget = ({
  path,
  addField,

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

      const [parentPath, index] = splitIndex(path);

      const field = {  // FIXME: tmp
        label: '(New field)',
        class: 'textinput',
      };

      addField(
        'record',  // FIXME: tmp
        'reception',  // FIXME: tmp
        parentPath,
        index,
        field,
      );
    }}
  />
);

export default reduxConnect(null, mapDispatchToProps)(
  DropTarget('editable-field', editableFieldTarget, collect)(
    FieldDnDTarget
  )
);
