/* eslint-env jest */

jest.unmock('react-redux-form');
jest.unmock('immutable');
jest.unmock('../index');

import { shallow } from 'enzyme';
import React from 'react';
import Immutable from 'immutable';

import PatientView from '../index';
import Footer from '../Footer';

describe('<PatientView />', () => {
  it('calls init() at componentWillMount()', () => {
    const mockInit = jest.fn();
    expect(mockInit).not.toBeCalled();

    shallow(<PatientView
      init={mockInit}
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      records={[]}
      addNewActiveRecord={jest.fn()}
      putActivePatient={jest.fn()}
      putActiveRecord={jest.fn()}
      recordFormStyles={[]}
    />);

    expect(mockInit).toBeCalled();
  });

  it('does not throw errors if patient.name is null', () => {
    const mockInit = jest.fn();

    shallow(<PatientView
      init={mockInit}
      patient={{
        _id: 'patient_foo',
      }}
      records={[]}
      addNewActiveRecord={jest.fn()}
      putActivePatient={jest.fn()}
      putActiveRecord={jest.fn()}
      recordFormStyles={[]}
    />);
  });

  it('has record form type selector', () => {
    const mockInit = jest.fn();

    const wrapper = shallow(<PatientView
      init={mockInit}
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      records={[]}
      addNewActiveRecord={jest.fn()}
      putActivePatient={jest.fn()}
      putActiveRecord={jest.fn()}
      recordFormStyles={Immutable.fromJS([
        { id: 'hoge', label: 'Hoge' },
        { id: 'fuga', label: 'Fuga' },
      ])}
    />);

    const select = wrapper.find('select');
    expect(select.childAt(0).prop('value')).toBe('hoge');
    expect(select.childAt(0).text()).toBe('Hoge');
    expect(select.childAt(1).prop('value')).toBe('fuga');
    expect(select.childAt(1).text()).toBe('Fuga');
  });

  it('hides Footer if isNew is true', () => {
    const wrapper = shallow(
      <PatientView
        init={jest.fn()}
        patient={{
          _id: 'patient_foo',
          name: 'foo bar',
        }}
        isNew
      />
    );

    expect(wrapper.find(Footer).length).toBe(0);
  });
});
