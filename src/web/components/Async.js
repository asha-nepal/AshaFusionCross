/* @flow */
import React, { Component } from 'react';

type Props = {
  load: Promise<ReactClass<any>>,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      failed: false,
      component: null,
    };
  }

  state: {
    failed: boolean,
    component: ?ReactClass<any>,
  }

  componentWillMount = () => {
    this.executeLoad(this.props.load);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.load !== this.props.load) {
      this.executeLoad(nextProps.load);
    }
  }

  props: Props

  executeLoad(load: Promise<ReactClass<any>>) {
    this.setState({
      failed: false,
      component: null,
    });

    load
    .then(c => {
      this.setState({ component: c.default || c, failed: false });
    })
    .catch(() => {
      this.setState({ component: null, failed: true });
    });
  }

  render() {
    if (this.state.failed) return <div>error</div>;
    if (!this.state.component) return (
      <div className="loading-container"><div className="loading-content" /></div>
    );

    return React.createElement(this.state.component, this.props);
  }
}
