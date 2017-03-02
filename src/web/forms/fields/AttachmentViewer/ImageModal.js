/* @flow */

import React from 'react';
import Modal from '../../../components/Modal';
import downloadBlob from 'lib/download-blob';

export default ({
  isOpen,
  onClose,
  imageBlob,
  imageName,
}: {
  isOpen: boolean,
  onClose: () => void,
  imageBlob: ?Blob,
  imageName: ?string,
}) => {
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
            className="icon is-large"
            onClick={e => {
              e.preventDefault();
              if (imageBlob) downloadBlob(imageBlob, imageName || 'file');
            }}
          ><i className="fa fa-download" /></a>
        }
        {imageUrl &&
          <a
            className="icon is-large"
            href={imageUrl}
            target="_blank"
          ><i className="fa fa-external-link" /></a>
        }
      </div>
    </Modal>
  );
};
