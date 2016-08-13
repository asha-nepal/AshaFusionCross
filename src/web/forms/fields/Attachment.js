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
    <AttachmentViewer
      label={label}
      rootModel={rootModel}
      model={model}
    />
    <AttachmentInput
      accept={accept}
      multiple={multiple}
    />
  </div>
);
