/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../DynamicForm');
jest.unmock('../fields');
jest.unmock('../utils');

import React from 'react';
import { shallow } from 'enzyme';

import { Form } from 'react-redux-form';
import { DynamicFormComponent } from '../DynamicForm';
import { TextInput } from '../fields';

describe('<DynamicFormComponent />', () => {
  it('shows submit button if onSubmit prop provided', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <DynamicFormComponent
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
      <DynamicFormComponent />
    );

    expect(wrapper.find('button[type="submit"]').length).toBe(0);
  });

  it('shows remove button if onRemove prop provided', () => {
    const onRemove = jest.fn();
    const ev = { preventDefault: jest.fn() };

    const wrapper = shallow(
      <DynamicFormComponent
        onRemove={onRemove}
      />
    );

    const removeButton = wrapper.find('a').last();
    removeButton.simulate('click', ev);
    expect(onRemove).toBeCalled();
  });

  it('hides remove button if onRemove not provided', () => {
    const wrapper = shallow(
      <DynamicFormComponent />
    );

    expect(wrapper.find('a').length).toBe(0);
  });

  it('creates field components based on style definition and fieldDefs', () => {
    const style = [
      { field: 'foo', class: 'textinput' },
      'bar',
      {
        class: 'block',
        children: [
          { field: 'yo', class: 'textinput' },
        ],
      },
    ];

    const fieldDefs = {
      bar: {
        field: 'bar', class: 'textinput',
      },
    };

    const wrapper = shallow(
      <DynamicFormComponent
        style={style}
        fieldDefs={fieldDefs}
      />
    );

    expect(wrapper.find(TextInput).length).toBe(3);
  });
});
