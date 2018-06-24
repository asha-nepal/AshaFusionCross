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

type Props = {
  blob: Blob,
  alt: string,
  onClick: () => void,
}

export default class extends Component {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.blob !== this.props.blob) return true;
    if (nextProps.alt !== this.props.alt) return true;
    // Skip checking equality of onClick

    return false;
  }

  props: Props

  render() {
    const {
      blob,
      alt,
      onClick,
    } = this.props;

    return (
      <a
        className="image is-128x128"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <img src={URL.createObjectURL(blob)} alt={alt} />
      </a>
    );
  }
}
