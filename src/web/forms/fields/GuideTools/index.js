/* @flow */

import React, { Component } from 'react';

import Modal from '../../../components/Modal';

import btnDiabetesImg from '../../../../../assets/img/btn-diabetes.jpg';
import btnBloodPressureImg from '../../../../../assets/img/btn-blood-pressure.jpg';
import modalBloodPressureImg from '../../../../../assets/img/modal-blood-pressure.png';
import diabetesTableHTML from './diabetes.html';

const createDiabetesTable = () => ({
  __html: diabetesTableHTML,
});

const DiabetesTable = <div className="guidetool" dangerouslySetInnerHTML={createDiabetesTable()} />;

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
            return false;
          }}
        >
          <img src={btnDiabetesImg} alt="Diabetes" style={{ height: '100%' }} />
        </a>

        <a
          className="button"
          onClick={e => {
            e.preventDefault();
            this.setState({ modal: 'bloodpressure' });
            return false;
          }}
        >
          <img src={btnBloodPressureImg} alt="Blood pressure" style={{ height: '100%' }} />
        </a>

        <Modal
          isOpen={!(this.state.modal === false)}
          onClose={() => this.setState({ modal: false })}
        >
          <div className="box">
          {this.state.modal === 'diabetes' ? (
            DiabetesTable
          ) : (
            <div>
              <img
                src={modalBloodPressureImg}
                alt="Diagnosis algorithm"
              />
              <p>
                Cited from:
                "Health Care Guideline Hypertension Diagnosis and Treatment",
                Institute for Clinical Systems Improvement
              </p>
              <a target="_blank" href="/assets/HTN.pdf">Original PDF</a>
            </div>
          )}
          </div>
        </Modal>
      </div>
    );
  }
}
