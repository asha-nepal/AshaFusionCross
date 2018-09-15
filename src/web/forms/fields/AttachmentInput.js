/**
 * Copyright 2018 Yuichiro Tsuchiya, Yu Tachibana
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

function dragHandler(event) {
  // console.log('This just happened: ', event);
  event.preventDefault();
}

type Props = {
  accept: ?string,
  multiple: ?boolean,
  addAttachments: (attachments: Object, meta: Array<Object>) => void,
}

// export class AttachmentInputComponentr extends React.Component {
//   constructor(props: Props) {
//     super(props);
//
//     this.state = {
//       isDragging: false,
//     };
//   }
//
//   state: {
//     isDragging: boolean,
//   }
//
//   props: Props;
//
//   render() {
//     const {
//       accept,
//       multiple,
//       addAttachments,
//     } = this.props;
//
//     return (
//
//     );
//   }
// }

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
  <div className="field">
    <label className="file-label">
      <div className="file is-small is-boxed">
        <input
          className="file-input"
          type="file"
          style={{ opacity: 0 }}
          accept={accept}
          multiple={multiple}
          onChange={e => {
            const files = e.target.files;
            const meta = Array(files.length);
            const attachments = {};
            const idPromises = Array(files.length);

            for (let i = 0; i < files.length; i++) {
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
        <span
          className="file-cta"
          onDragOver={e => {
            dragHandler(e);
            e.target.style = 'border:2px dashed blue;opacity:0.7;';
          }
          }
          onDragLeave={e => {
            e.preventDefault();
            e.target.style = '';
          }
          }
          onDrop={e => {
            e.preventDefault();
            e.target.style = '';
            const nrfiles = e.dataTransfer.items.length;
            const meta = Array(nrfiles);
            const attachments = {};
            const idPromises = Array(nrfiles);
            const items = [];

            if (e.dataTransfer.items) {
              for (let i = 0; i < nrfiles; i++) {
                idPromises[i] = randomstring(16);
                items.push(e.dataTransfer.items[i].getAsFile());
              }
              Promise.all(idPromises).then(ids => {
                ids.forEach((id, i) => {
                  const fl = items[i];
                  meta[i] = {
                    id,
                    name: fl.name,
                    size: fl.size,
                    type: fl.type,
                    lastModified: fl.lastModified,
                  };
                  attachments[id] = {
                    content_type: fl.type,
                    data: fl,
                  };
                });
                console.log(attachments, meta);
                addAttachments(attachments, meta);
              });
            }
            // addAttachments(atts, m);
          }
          }

        >
          <span className="file-icon">
            <i className="fa fa-upload"></i>
          </span>
          <span className="file-label">
            Upload Image <br />
            or Drag and Drop <br />
          </span>
        </span>
      </div>
    </label>
  </div>
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
