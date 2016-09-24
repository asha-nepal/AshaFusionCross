/* @flow */

export const getDirtyIndices = (formState: Array<Object>) => {
  if (!formState.fields) { return []; }

  const dirties = {};

  Object.keys(formState.fields).forEach(key => {
    if (formState.fields[key].pristine) { return; }

    const index = key.split('.')[0];

    dirties[index] = true;
  });

  return Object.keys(dirties).map(i => parseInt(i, 10));
};
