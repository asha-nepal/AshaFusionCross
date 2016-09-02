/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  RadioGroup,
  Block,
} from './fields';

export default ({
  model,
  onSubmit,
  onRemove,
  freeze,
}: {
  model: string,
  onSubmit: (patient: PatientObject) => void,
  onRemove: () => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    <TextInput
      model={`${model}.name`}
      label="Name"
      required
    />

    <Block>
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
    </Block>

    <TextInput
      model={`${model}.address`}
      label="Address"
    />

    <TextInput
      model={`${model}.ethnicity`}
      label="Ethnicity"
    />

    <div className="level">
      <p className="level-left">
        <button className="button is-primary" type="submit" disabled={freeze}>
          Submit
        </button>
      </p>
      {onRemove &&
        <p className="level-right">
          <a
            className="button is-danger"
            disabled={freeze}
            onClick={e => {
              e.preventDefault();
              if (!freeze) { onRemove(); }
            }}
          ><i className="fa fa-times" />Remove patient</a>
        </p>
      }
    </div>
  </Form>
);
