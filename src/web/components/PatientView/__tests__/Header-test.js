/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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
jest.unmock('react-router-dom');
jest.unmock('../Header');

import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

describe('<PatientView.Header />', () => {
  it('has link to the top when verbose prop is set as false', () => {
    const wrapper = shallow(<Header
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      verbose={false}
    />);

    expect(wrapper.find(Link).at(0).prop('to')).toBe('/');
  });

  it('has link to the top when verbose prop is set as true', () => {
    const wrapper = shallow(<Header
      patient={{
        _id: 'patient_foo',
        name: 'foo bar',
      }}
      verbose
    />);

    expect(wrapper.find(Link).at(0).prop('to')).toBe('/');
  });
});
