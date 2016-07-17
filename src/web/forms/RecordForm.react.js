import React from 'react';
import { reduxForm } from 'redux-form';

export default reduxForm({
  form: 'record',
  fields: ['_id', '_rev', 'type', 'height', 'weight'],
})(({ fields, handleSubmit, freeze, hidden }) => {
  if (hidden) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="control">
        <label className="label">
          Height
          <input className="input" type="text" {...fields.height} />
        </label>
      </p>
      <p className="control">
        <label className="label">
          Weight
          <input className="input" type="text" {...fields.weight} />
        </label>
      </p>

      <button type="submit" className="button is-primary" disabled={freeze}>Submit</button>
    </form>
  );
});
