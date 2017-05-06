/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import randomstring from 'randomstring';

const AttachmentInputComponent = ({
  label,
  accept,
  multiple,
  addAttachments,
}: {
  label: string,
  idprefix: string,
  accept: ?string,
  multiple: ?boolean,
  addAttachments: (attachments: Object, meta: Array<Object>) => void,
}) => (
  <p className="control">
    {label && <label className="label">{label}</label>}
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
