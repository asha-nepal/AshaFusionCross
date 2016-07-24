/* @flow */

import React from 'react';
import { Field, Form } from 'react-redux-form';

export default ({
  model,
  onSubmit,
  freeze,
}: {
  model: string,
  onSubmit: (patient: PatientObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    <p className="control">
      <label className="label">
        Name
        <Field model={`${model}.name`}>
          <input type="text" className="input" />
        </Field>
      </label>
    </p>

    <p className="control">
      <label className="label">Sex</label>
      <label className="radio">
        <Field model={`${model}.sex`}>
          <input
            type="radio"
            value="male"
          />
        </Field>
        {' '}Male
      </label>
      <label className="radio">
        <Field model={`${model}.sex`}>
          <input
            type="radio"
            value="female"
          />
        </Field>
        {' '}Female
      </label>
    </p>

    <p className="control">
      <label className="label">
        Age
        <Field model={`${model}.age`}>
          <input type="number" className="input" />
        </Field>
      </label>
    </p>

    <p className="control">
      <label className="label">
        Address
        <Field model={`${model}.address`}>
          <input type="text" className="input" />
        </Field>
      </label>
    </p>

    <button className="button is-primary" type="submit" disabled={freeze}>
      Submit
    </button>
  </Form>
);
