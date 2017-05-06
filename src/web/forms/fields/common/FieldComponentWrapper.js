/* @flow */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        ref="outer"
        style={{
          position: 'relative',
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <ReactCSSTransitionGroup
          transitionName="field-tooltip"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
        >
        {this.state.hover && getPreviousData &&
          <div
            key="tooltip"
            className="field-tooltip"
            style={{
              top: this.refs.outer && this.refs.outer.getBoundingClientRect().height || 0,
              left: 0,
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
        }
        </ReactCSSTransitionGroup>
        {children}
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
