/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('immutable');
jest.unmock('react-dnd');
jest.unmock('react-dnd-html5-backend');
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
