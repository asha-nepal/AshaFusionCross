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
