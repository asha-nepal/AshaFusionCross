/* @flow */

export const DFORM_STYLE_FIELD_INSERT = 'DFORM_STYLE_FIELD_INSERT';
export const dformStyleFieldInsert = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
): DformStyleFieldInsertAction => ({
  type: DFORM_STYLE_FIELD_INSERT,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
  },
});

export const DFORM_STYLE_FIELD_UPDATE = 'DFORM_STYLE_FIELD_UPDATE';
export const dformStyleFieldUpdate = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean = false,
): DformStyleFieldUpdateAction => ({
  type: DFORM_STYLE_FIELD_UPDATE,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
    merge,
  },
});

export const DFORM_STYLE_FIELD_REMOVE = 'DFORM_STYLE_FIELD_REMOVE';
export const dformStyleFieldRemove = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
): DformStyleFieldRemoveAction => ({
  type: DFORM_STYLE_FIELD_REMOVE,
  payload: {
    group,
    id,
    parentPath,
    index,
  },
});

export const DFORM_STYLE_FIELD_MOVE = 'DFORM_STYLE_FIELD_MOVE';
export const dformStyleFieldMove = (
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
): DformStyleFieldMoveAction => ({
  type: DFORM_STYLE_FIELD_MOVE,
  payload: {
    group,
    id,
    fromParentPath,
    fromIndex,
    toParentPath,
    toIndex,
  },
});

export const DFORM_STYLE_FORM_ADD = 'DFORM_STYLE_FORM_ADD';
export const dformStyleFormAdd = (
  group: string,
  id: string,
  label: string,
) => ({
  type: DFORM_STYLE_FORM_ADD,
  payload: {
    group,
    id,
    label,
  },
});
