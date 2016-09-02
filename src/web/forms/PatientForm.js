/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  RadioGroup,
  Block,
} from './fields';

import { required } from './fields/validators';

export default ({
  modelReducer,
  fieldReducer,
  onSubmit,
  onRemove,
  freeze,
}: {
  modelReducer: string,
  fieldReducer: string,
  onSubmit: (patient: PatientObject) => void,
  onRemove: () => void,
  freeze: boolean,
}) => (
  <Form
    model={modelReducer}
    onSubmit={onSubmit}
  >
    <TextInput
      modelReducer={modelReducer}
      fieldReducer={fieldReducer}
      model="name"
      label="Name"
      validators={{
        required,
      }}
    />

    <Block>
      <RadioGroup
        modelReducer={modelReducer}
        fieldReducer={fieldReducer}
        model="sex"
        label="Sex"
        options={[
          { id: 'male', label: 'Male' },
          { id: 'female', label: 'Female' },
        ]}
      />

      <TextInput
        modelReducer={modelReducer}
        fieldReducer={fieldReducer}
        model="age"
        label="Age"
        type="number"
      />
    </Block>

    <TextInput
      modelReducer={modelReducer}
      fieldReducer={fieldReducer}
      model="address"
      label="Address"
    />

    <TextInput
      modelReducer={modelReducer}
      fieldReducer={fieldReducer}
      model="ethnicity"
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
