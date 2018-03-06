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

export default function (blob: Blob, name: string) {
  if (window.navigator.msSaveBlob) {
    // IEなら独自関数を使います。
    window.navigator.msSaveBlob(blob, name);
  } else {
    // それ以外はaタグを利用してイベントを発火させます
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.target = '_blank';
    link.download = name;

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: false,
    });
    link.dispatchEvent(clickEvent);
    setTimeout(() => {
      if (window.URL.revokeObjectURL) window.URL.revokeObjectURL(url);
    }, 0);
  }
}
