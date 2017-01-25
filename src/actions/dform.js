/* @flow */

export const DFORM_STYLE_FIELD_INSERT = 'DFORM_STYLE_FIELD_INSERT';
export const insertDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
): insertDformStyleFieldAction => ({
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
export const updateDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean = false,
): updateDformStyleFieldAction => ({
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
export const removeDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
): removeDformStyleFieldAction => ({
  type: DFORM_STYLE_FIELD_REMOVE,
  payload: {
    group,
    id,
    parentPath,
    index,
  },
});

export const DFORM_STYLE_FIELD_MOVE = 'DFORM_STYLE_FIELD_MOVE';
export const moveDformStyleField = (
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
): moveDformStyleFieldAction => ({
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

export const DFORM_STYLE_FORM_SET = 'DFORM_STYLE_FORM_SET';
export const setDformStyleForm = (
  group: string,
  id: string,
  label: string,
  style: DformStyle,
  rev: string,
) => ({
  type: DFORM_STYLE_FORM_SET,
  payload: { group, id, label, style, rev },
});

export const DFORM_STYLES_FETCH = 'DFORM_STYLES_FETCH';
export const fetchDformStyles = () => ({
  type: DFORM_STYLES_FETCH,
});

export const DFORM_STYLES_PUT = 'DFORM_STYLES_PUT';
export const putDformStyles = () => ({
  type: DFORM_STYLES_PUT,
});
