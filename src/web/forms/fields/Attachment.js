/* @flow */

import React from 'react';
import { AttachmentInput } from './AttachmentInput';
import { AttachmentViewer } from './AttachmentViewer';

export const Attachment = ({
  model,
  label,
  modelReducer,
  accept,
  multiple,
}: AttachmentProps) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <AttachmentViewer
      modelReducer={modelReducer}
      model={model}
    />
    <AttachmentInput
      modelReducer={modelReducer}
      model={model}
      accept={accept}
      multiple={multiple}
    />
  </div>
);
