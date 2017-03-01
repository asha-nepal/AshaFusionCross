/* @flow */

import React from 'react';

type Props = {
  children?: React$Element<any>,
  value: any,
  onChange: (value: any) => void,
  getPreviousData: () => any,
}

class DittoWrapper extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  state: {
    hover: boolean,
  }

  props: Props

  render() {
    const {
      children,
      value,
      onChange,
      getPreviousData,
      ...rest
    } = this.props;

    return (
      <div
        {...rest}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {children}
        {this.state.hover && getPreviousData &&
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                top: -20,  // FIXME: Just for prescription. Currently not generalized.
                position: 'absolute',
                zIndex: 500,
              }}
            >
              <a
                className="button is-primary"
                onClick={e => {
                  e.preventDefault();

                  if (!getPreviousData) return;

                  const prev = getPreviousData();
                  if (!prev) return;

                  if (value && value !== prev) {
                    if (!confirm('This field is already filled. Are you sure to update?')) return;
                  }

                  onChange(prev);
                }}
              >Ditto</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ({
  children,
  value,
  onChange,
  getPreviousData,
  ...rest
}: {
  children?: React$Element<any>,
  value: any,
  onChange: (value: any) => void,
  getPreviousData?: () => any,
}) => (
  getPreviousData
  ? (
    <DittoWrapper
      value={value}
      onChange={onChange}
      getPreviousData={getPreviousData}
      {...rest}
    >{children}</DittoWrapper>
  )
  : <div {...rest}>{children}</div>
);
