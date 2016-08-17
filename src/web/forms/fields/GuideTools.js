/* @flow */

import React, { Component } from 'react';

import Modal from '../../components/Modal';

import btnDiabetesImg from '../../../../assets/img/btn-diabetes.jpg';
import btnBloodPressureImg from '../../../../assets/img/btn-blood-pressure.jpg';
import modalDiabetesImg from '../../../../assets/img/modal-diabetes.jpg';
import modalBloodPressureImg from '../../../../assets/img/modal-blood-pressure.jpg';

export class GuideTools extends Component {
  constructor(props: {}) {
    super(props);

    this.state = {
      modal: false,
    };
  }

  state: {
    modal: false | 'diabetes' | 'bloodpressure',
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <a
          className="button"
          onClick={e => {
            e.preventDefault();
            this.setState({ modal: 'diabetes' });
          }}
        ><img src={btnDiabetesImg} alt="Diabetes" style={{ height: '100%' }} /></a>

        <a
          className="button"
          onClick={e => {
            e.preventDefault();
            this.setState({ modal: 'bloodpressure' });
          }}
        ><img src={btnBloodPressureImg} alt="Blood pressure" style={{ height: '100%' }} /></a>

        <Modal
          isOpen={!(this.state.modal === false)}
          onClose={() => this.setState({ modal: false })}
        >
          <div className="box">
            <img
              src={this.state.modal === 'diabetes'
                ? modalDiabetesImg
                : modalBloodPressureImg
              }
              alt=""
            />
          </div>
        </Modal>
      </div>
    );
  }
}
