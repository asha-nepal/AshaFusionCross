import React from 'react';
import { reduxForm } from 'redux-form';

export default reduxForm({
  form: 'patient',
  fields: ['_id', '_rev', 'type', 'name', 'age', 'sex', 'address'],
})(({ fields, handleSubmit, freeze }) => (
  <form onSubmit={handleSubmit}>
    <p className="control">
      <label className="label">
        Name
        <input className="input" type="text" {...fields.name} />
      </label>
    </p>

    <p className="control">
      <label className="label">Sex</label>
      <label className="radio">
        <input
          type="radio"
          {...fields.sex}
          value="male"
          checked={fields.sex.value === 'male'}
        />
        {' '}Male
      </label>
      <label className="radio">
        <input
          type="radio"
          {...fields.sex}
          value="female"
          checked={fields.sex.value === 'female'}
        />
        {' '}Female
      </label>
    </p>

    <p className="control">
      <label className="label">
        Age
        <input className="input" type="number" {...fields.age} />
      </label>
    </p>

    <p className="control">
      <label className="label">
        Address
        <input className="input" type="text" {...fields.address} />
      </label>
    </p>

    <button className="button is-primary" type="submit" disabled={freeze}>Submit</button>
  </form>
));
