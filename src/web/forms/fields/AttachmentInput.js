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
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import randomstring from 'randomstring';

const AttachmentInputComponent = ({
  accept,
  multiple,
  addAttachments,
}: {
  idprefix: string,
  accept: ?string,
  multiple: ?boolean,
  addAttachments: (attachments: Object, meta: Array<Object>) => void,
}) => (
  <p className="control">
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={e => {
        const files = e.target.files;

        const meta = Array(files.length);
        const attachments = {};
        const idPromises = Array(files.length);

        for (let i = 0; i < files.length; ++i) {
          idPromises[i] = randomstring(16);
        }

        Promise.all(idPromises)
        .then(ids => {
          ids.forEach((id, i) => {
            const file = files[i];

            meta[i] = {
              id,
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
            };

            attachments[id] = {
              content_type: file.type,
              data: file,
            };
          });

          addAttachments(attachments, meta);
        });
      }}
    />
  </p>
);

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
  addAttachments: (attachments, meta) => {
    dispatch(actions.merge(`${ownProps.rootModel}._attachments`, attachments));

    for (let i = 0; i < meta.length; ++i) {
      dispatch(actions.push(ownProps.model, meta[i]));
    }
  },
});

export const AttachmentInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentInputComponent);
