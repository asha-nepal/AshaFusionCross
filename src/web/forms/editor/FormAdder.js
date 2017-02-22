/* @flow */

import React from 'react';
import Modal from '../../components/Modal';
import {
  TextInputComponent,
} from '../fields';

type Props = {
  onFormAdd: (id: string, label: string) => void,
  className?: string,
}

export default class extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
      newFormId: '',
      newFormLabel: '',
    };
  }

  state: {
    isModalOpen: boolean,
    newFormId: string,
    newFormLabel: string,
  }

  props: Props

  render() {
    const {
      onFormAdd,
      className,
    } = this.props;

    return (
      <span className={className}>
        <a
          className="button is-primary"
          onClick={e => {
            e.preventDefault();
            this.setState({ isModalOpen: true });
          }}
        >Add new form</a>

        <Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <div className="box">
            <TextInputComponent
              label="ID"
              value={this.state.newFormId}
              onChange={newFormId => this.setState({ newFormId })}
            />
            <TextInputComponent
              label="Label"
              value={this.state.newFormLabel}
              onChange={newFormLabel => this.setState({ newFormLabel })}
            />
            <p className="control">
              <label className="label">&nbsp;</label>
              <a
                className="button"
                onClick={e => {
                  e.preventDefault();
                  onFormAdd(this.state.newFormId, this.state.newFormLabel);
                  this.setState({
                    isModalOpen: false,
                    newFormId: '',
                    newFormLabel: '',
                  });
                }}
              >Add new form</a>
            </p>
          </div>
        </Modal>
      </span>
    );
  }
}
