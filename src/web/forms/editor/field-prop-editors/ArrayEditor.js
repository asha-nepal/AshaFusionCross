/* flow */

import React from 'react';
import {
  TextInputComponent,
} from '../../fields';

// TODO: Create more sophisticated array editor
// SubformListComponentのインタフェースが他と違うためこれだけ特別扱い。
// SubformListComponentのインタフェースを揃える方向に持って行きたい
export default ({
  label,
  value,
  onChange,
  delimiter = ',',
  ...props
}: {
  label: string,
  value: Array<string>,
  onChange: (newValue: Array<string>) => void,
  delimiter: string,
}) => {
  const str = value.join(delimiter);
  return (
    <TextInputComponent
      label={label}
      value={str}
      onChange={v => onChange(v.split(delimiter).map(elem => elem.trim()))}
      {...props}
    />
  );
};
