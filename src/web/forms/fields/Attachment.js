/* @flow */

import React from 'react';
import { AttachmentInput } from './AttachmentInput';
import { AttachmentViewer } from './AttachmentViewer';

export const Attachment = ({
  model,
  label,
  rootModel,
  accept,
  multiple,
}: AttachmentProps) => (
  <div className="control">
    <label className="label">{label}</label>
    <AttachmentViewer
      rootModel={rootModel}
      model={model}
    />
    <AttachmentInput
      rootModel={rootModel}
      model={model}
      accept={accept}
      multiple={multiple}
    />
  </div>
);
