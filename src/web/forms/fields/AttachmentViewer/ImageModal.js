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
