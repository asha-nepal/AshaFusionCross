/* @flow */
import React from 'react';
import { ICD10 } from '../../../../../data';


export default ({
  label,
  value,
  onClearRequest,
  size,
  readonly,
  width,
}: {
  label?: ?string,
  value: string,
  onClearRequest: ?() => void,
  size?: string,
  readonly?: boolean,
  width?: string | number,
}) => {
  const sizeClassName = size ? ` is-${size}` : '';
  const icd10Datum = value && ICD10.find(item => item.code === value);

  return (
    <div className="control" style={{ width }}>
      {label && <label className="label">{label}</label>}
      <div className={readonly ? 'level form-static' : 'level'}>
        <span className="level-left">
          <div className={`content${sizeClassName}`}>
            <small style={{ marginRight: '1em' }}>{value || ''}</small>
            {icd10Datum ? icd10Datum.description : ''}
          </div>
        </span>
        {!readonly && onClearRequest &&
          <span className="level-right">
            <a
              className={`button${sizeClassName}`}
              onClick={e => {
                e.preventDefault();
                if (onClearRequest) onClearRequest();
              }}
            ><i className="fa fa-times" /></a>
          </span>
        }
      </div>
    </div>
  );
};
