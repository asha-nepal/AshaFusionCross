/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import { AttachmentInput } from './AttachmentInput';
import { AttachmentViewer } from './AttachmentViewer';

export const Attachment = ({
  model,
  rootModel,
  accept,
  multiple,
}: AttachmentProps) => (
  <div className="field">
    {' '}
    {/* TODO: Remove outer div.field after upgrading React to v16 */}
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
