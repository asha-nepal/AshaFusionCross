/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  RadioGroup,
} from './fields';

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
    <TextInput
      model={`${model}.name`}
      label="Name"
    />

    <RadioGroup
      model={`${model}.sex`}
      label="Sex"
      options={[
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
      ]}
    />

    <TextInput
      model={`${model}.age`}
      label="Age"
      type="number"
    />

    <TextInput
      model={`${model}.address`}
      label="Address"
    />

    <button className="button is-primary" type="submit" disabled={freeze}>
      Submit
    </button>
  </Form>
);
