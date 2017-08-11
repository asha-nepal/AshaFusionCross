/**
 * Copyright 2016 Yuichiro Tsuchiya
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

jest.unmock('react-redux');
jest.unmock('immutable');
jest.unmock('../DynamicForm');

import React from 'react';
import { shallow } from 'enzyme';

import Immutable from 'immutable';
import { Form } from 'react-redux-form';
import { DynamicFormComponent } from '../DynamicForm';

describe('<DynamicFormComponent />', () => {
  it('shows submit button if onSubmit prop provided', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <DynamicFormComponent
        style={Immutable.List()}
        onSubmit={onSubmit}
      />
    );

    const submitButtons = wrapper.find('button[type="submit"]');
    expect(submitButtons.length).toBe(1);
    const submitButton = submitButtons.at(0);
    expect(submitButton.parents(Form).length).toBe(1);
  });

  it('hides submit button if onSubmit not provided', () => {
    const wrapper = shallow(
      <DynamicFormComponent
        style={Immutable.List()}
      />
    );

    expect(wrapper.find('button[type="submit"]').length).toBe(0);
  });

  it('shows remove button if onRemove prop provided', () => {
    const onRemove = jest.fn();
    const ev = { preventDefault: jest.fn() };

    const wrapper = shallow(
      <DynamicFormComponent
        style={Immutable.List()}
        onRemove={onRemove}
      />
    );

    const removeButton = wrapper.find('a').last();
    removeButton.simulate('click', ev);
    expect(onRemove).toBeCalled();
  });

  it('hides remove button if onRemove not provided', () => {
    const wrapper = shallow(
      <DynamicFormComponent
        style={Immutable.List()}
      />
    );

    expect(wrapper.find('a').length).toBe(0);
  });
});
