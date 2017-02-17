import {
  POUCH_DOCS_FETCH_SUCCESS,
} from 'actions';


export const generatePouchDocsReducer = (name: string) =>
  (
    state: Array<PouchDocType> = [],
    action: {
      type: string,
      payload: {
        name: string,
        data: Array<PouchDocType>,
      }
    }
  ): Array<PouchDocType> => {
    const {
      type,
      payload,
    } = action;

    if (!payload || payload.name !== name) return state;

    switch (type) {
      case POUCH_DOCS_FETCH_SUCCESS:
        return payload.data;

      default:
        return state;
    }
  };
