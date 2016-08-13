/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
  createId,
} from '../../../utils';

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
    <label className="label">
      {label}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={e => {
          const files = e.target.files;

          const meta = [];
          const attachments = {};
          for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            const id = createId(16);

            meta.push({
              id,
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
            });

            attachments[id] = {
              content_type: file.type,
              data: file,
            };
          }

          addAttachments(attachments, meta);
        }}
      />
    </label>
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
