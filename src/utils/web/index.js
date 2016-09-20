/* @flow */

export const downloadBlob = (blob: Blob, name: string) => {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, name);
  } else {
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.target = '_blank';
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
