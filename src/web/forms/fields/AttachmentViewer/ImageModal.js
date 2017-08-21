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
import Modal from '../../../components/Modal';
import downloadBlob from 'lib/download-blob';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  imageBlob: ?Blob,
  imageName: ?string,
}

export default class extends Component {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.isOpen !== this.props.isOpen) return true;
    if (nextProps.imageBlob !== this.props.imageBlob) return true;
    if (nextProps.imageName !== this.props.imageName) return true;
    // Skip checking equality of onClose

    return false;
  }

  props: Props

  render() {
    const {
      isOpen,
      onClose,
      imageBlob,
      imageName,
    } = this.props;

    if (!imageBlob) return null;

    let imageUrl;
    try {
      imageUrl = URL.createObjectURL(imageBlob);
    } catch (e) {
      return null;
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        {imageUrl &&
          <p className="image" style={{ marginBottom: 20 }}>
            <img
              src={imageUrl}
              alt={imageName || ''}
            />
          </p>
        }
        <div className="has-text-centered">
          {imageBlob &&
            <a
              className="icon is-medium inverse"
              onClick={e => {
                e.preventDefault();
                if (imageBlob) downloadBlob(imageBlob, imageName || 'file');
              }}
            ><i className="fa fa-download" /></a>
          }
          {imageUrl &&
            <a
              className="icon is-medium inverse"
              href={imageUrl}
              target="_blank"
            ><i className="fa fa-external-link" /></a>
          }
        </div>
      </Modal>
    );
  }
}
