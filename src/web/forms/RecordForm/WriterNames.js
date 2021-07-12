import React from 'react';
import {
  TextInput,
} from '../fields';

export default ({
  model,
}: {
  model: string,
}) => (
  <div className="control is-horizontal">
    <div className="control-label">
      <label className="label">Originally created by:</label>
    </div>

    <TextInput
      model={`${model}.$created_by`}
      readonly
    />

    <div className="control-label">
      <label className="label">Last updated by:</label>
    </div>

    <TextInput
      model={`${model}.$updated_by`}
      readonly
    />
  </div>
);
