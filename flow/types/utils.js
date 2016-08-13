export type CancelablePromise = {
  promise: Promise,
  cancel: () => void,
};
