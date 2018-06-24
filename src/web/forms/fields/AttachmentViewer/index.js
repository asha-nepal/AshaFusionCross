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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import { makeCancelable } from 'utils';
import downloadBlob from 'lib/download-blob';
import ImageThumbnail from './ImageThumbnail';
import FileThumbnail from './FileThumbnail';
import ImageModal from './ImageModal';

class AttachmentViewerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cache: {},
      isModalOpen: false,
      modalImageBlob: null,
      modalImageName: null,
    };

    this._loadAttachmentsToCache = this._loadAttachmentsToCache.bind(this);
  }

  state: {
    cache: Object,
    isModalOpen: boolean,
    modalImageBlob: ?Blob,
    modalImageName: ?string,
  };

  componentDidMount() {
    const {
      docId,
      _attachments,
      metadata,
      db,
    } = this.props;

    if (docId && metadata) {
      this._loadAttachmentsToCache(db, docId, _attachments, metadata);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      docId,
      _attachments,
      metadata,
      db,
    } = nextProps;

    if (docId && metadata) {
      this._loadAttachmentsToCache(db, docId, _attachments, metadata);
    }
  }

  componentWillUnmount() {
    if (this.loadingCachesPromise) {
      this.loadingCachesPromise.cancel();
      this.loadingCachesPromise = null;
    }
  }

  loadingCachesPromise: ?CancelablePromise;

  _loadAttachmentsToCache: Function;

  _loadAttachmentsToCache(
    db: PouchInstance, docId: string, _attachments: Object, metadata: Array<Object>,
  ) {
    if (!db) { return; }
    if (!_attachments) { return; }

    const attachmentIds = metadata.map(m => m.id);
    const attachmentIdsToCache = attachmentIds.filter(id => id in _attachments
        && !_attachments[id].data
        && (!this.state.cache[docId] || !(id in this.state.cache[docId])));

    if (this.loadingCachesPromise) {
      this.loadingCachesPromise.cancel();
    }

    this.loadingCachesPromise = makeCancelable(
      Promise.all(attachmentIdsToCache.map(id => db.getAttachment(docId, id))),
    );

    this.loadingCachesPromise
      .promise
      .then((blobs) => {
        const newCache = this.state.cache;

        if (!newCache[docId]) {
          newCache[docId] = {};
        }

        for (let i = 0; i < blobs.length; ++i) {
          newCache[docId][attachmentIdsToCache[i]] = blobs[i];
        }

        this.setState(newCache);
      })
      .catch(() => {});
  }

  props: {
    docId: string,
    _attachments: Object,
    metadata: Array<Object>,
    db: PouchInstance,
    removeAttachment: (attachmentId: string) => void,
  };

  render() {
    const {
      docId,
      _attachments,
      metadata,
      removeAttachment,
    } = this.props;

    if (!metadata || typeof metadata.map !== 'function') {
      return null;
    }

    return (
      <div className="field">
        {' '}
        {/* TODO: Remove outer div.field after upgrading React to v16 */}
        <div className="columns is-mobile is-multiline">
          {metadata.map((m) => {
            const blob = (this.state.cache[docId] && this.state.cache[docId][m.id])
            || (_attachments && _attachments[m.id] && _attachments[m.id].data);

            let content = null;

            if (!blob) {
              content = `Loading, ${m.id} ${m.name}`;
            } else if (blob.type && blob.type.match(/image\/*/)) {
              content = (
                <ImageThumbnail
                  blob={blob}
                  alt={m.name}
                  onClick={() => this.setState({
                    isModalOpen: true,
                    modalImageBlob: blob,
                    modalImageName: m.name,
                  })}
                />
              );
            } else {
              content = (
                <FileThumbnail
                  label={m.name}
                  onClick={() => downloadBlob(blob, m.name)}
                />
              );
            }

            return (
              <div key={m.id} className="column is-narrow">
                {content}
                <button
                  className="button is-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    removeAttachment(m.id);
                  }}
                >
Remove
                </button>
              </div>
            );
          })}
        </div>
        <ImageModal
          isOpen={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          imageBlob={this.state.modalImageBlob}
          imageName={this.state.modalImageName}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const record = _get(state, ownProps.rootModel);

  return {
    docId: record && record._id,
    _attachments: record && record._attachments,
    metadata: _get(state, ownProps.model),
    db: state.db.instance,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeAttachment: (attachmentId) => {
    dispatch(actions.filter(ownProps.model, m => m.id !== attachmentId));
    dispatch(actions.omit(`${ownProps.rootModel}._attachments`, attachmentId));
  },
});

export const AttachmentViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentViewerComponent);
