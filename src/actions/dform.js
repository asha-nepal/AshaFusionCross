/* @flow */

export const DFORM_STYLE_INSERT = 'DFORM_STYLE_INSERT';
export const dformStyleInsert = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
): DformStyleInsertAction => ({
  type: DFORM_STYLE_INSERT,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
  },
});

export const DFORM_STYLE_UPDATE = 'DFORM_STYLE_UPDATE';
export const dformStyleUpdate = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean = false,
): DformStyleUpdateAction => ({
  type: DFORM_STYLE_UPDATE,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
    merge,
  },
});

export const DFORM_STYLE_DELETE = 'DFORM_STYLE_DELETE';
export const dformStyleDelete = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
): DformStyleDeleteAction => ({
  type: DFORM_STYLE_DELETE,
  payload: {
    group,
    id,
    parentPath,
    index,
  },
});

export const DFORM_STYLE_MOVE = 'DFORM_STYLE_MOVE';
export const dformStyleMove = (
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
): DformStyleMoveAction => ({
  type: DFORM_STYLE_MOVE,
  payload: {
    group,
    id,
    fromParentPath,
    fromIndex,
    toParentPath,
    toIndex,
  },
});
