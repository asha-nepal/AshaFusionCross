interface Action {
  type: string;
  error?: boolean;
  meta?: any;
}

interface PayloadAction<T> extends Action {
  payload: T;
}
