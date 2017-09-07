/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
