/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import { db } from '../../../db';
import { makeCancelable } from '../../../utils';

class AttachmentViewerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cache: {},
    };

    this._loadAttachmentsToCache = this._loadAttachmentsToCache.bind(this);
  }

  state: {
    cache: Object,
  };

  componentDidMount() {
    const {
      docId,
      _attachments,
      metadata,
    } = this.props;

    if (docId && metadata) {
      this._loadAttachmentsToCache(docId, _attachments, metadata);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      docId,
      _attachments,
      metadata,
    } = nextProps;

    if (docId && metadata) {
      this._loadAttachmentsToCache(docId, _attachments, metadata);
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

  _loadAttachmentsToCache(docId: string, _attachments: Object, metadata: Array<Object>) {
    if (!_attachments) { return; }

    const attachmentIds = metadata.map(m => m.id);
    const attachmentIdsToCache = attachmentIds.filter(id =>
        id in _attachments
        && !_attachments[id].data
        && (!this.state.cache[docId] || !(id in this.state.cache[docId]))
      );

    if (this.loadingCachesPromise) {
      this.loadingCachesPromise.cancel();
    }

    this.loadingCachesPromise = makeCancelable(
      Promise.all(attachmentIdsToCache.map(id => db.getAttachment(docId, id)))
    );

    this.loadingCachesPromise
      .promise
      .then(blobs => {
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

  _downloadBlob(blob: Object, name: string) {
    if (window.navigator.msSaveBlob) {
      // IEなら独自関数を使います。
      window.navigator.msSaveBlob(blob, name);
    } else {
      // それ以外はaタグを利用してイベントを発火させます
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.target = '_blank';
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  props: {
    label: string,
    docId: string,
    _attachments: Object,
    metadata: Array<Object>,
    removeAttachment: (attachmentId: string) => void,
  };

  render() {
    const {
      label,
      docId,
      _attachments,
      metadata,
      removeAttachment,
    } = this.props;

    if (!metadata || typeof metadata.map !== 'function') {
      return null;
    }

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        <div style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {metadata.map(m => {
          const blob = (this.state.cache[docId] && this.state.cache[docId][m.id])
            || (_attachments && _attachments[m.id] && _attachments[m.id].data);

          let content = null;

          if (!blob) {
            content = `Loading, ${m.id} ${m.name}`;
          } else if (blob.type && blob.type.match(/image\/*/)) {
            const url = URL.createObjectURL(blob);
            content = (
              <figure className="image is-128x128">
                <a href={url} target="_blank">
                  <img
                    src={url}
                    alt={m.name}
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: 128,
                      maxHeight: 128,
                      margin: '0 auto',
                    }}
                  />
                </a>
              </figure>
            );
          } else {
            content = (
              <div
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => this._downloadBlob(blob, m.name)}
              >
                <span className="icon is-large">
                  <i className="fa fa-file" />
                </span>
                <p>{m.name}</p>
              </div>
            );
          }

          return (
            <div key={m.id} className="column is-narrow" style={{ display: 'inline-block' }}>
              <div className="image is-128x128">
                {content}
              </div>
              <button
                className="button is-danger"
                onClick={e => {
                  e.preventDefault();
                  removeAttachment(m.id);
                }}
              >Remove</button>
            </div>
          );
        })}
        </div>
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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeAttachment: (attachmentId) => {
    dispatch(actions.filter(ownProps.model, (m) => m.id !== attachmentId));
    dispatch(actions.omit(`${ownProps.rootModel}._attachments`, attachmentId));
  },
});

export const AttachmentViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentViewerComponent);
