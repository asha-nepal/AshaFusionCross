import React from 'react';
import { reduxForm } from 'redux-form';

export default reduxForm({
  form: 'record',
  fields: ['_id', '_rev', 'type', 'height', 'weight'],
})(({ fields, handleSubmit, freeze }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>
        Height
        <input type="text" {...fields.height} />
      </label>
    </div>
    <div>
      <label>
        Weight
        <input type="text" {...fields.weight} />
      </label>
    </div>

    <button type="submit" disabled={freeze}>Submit</button>
  </form>
));
