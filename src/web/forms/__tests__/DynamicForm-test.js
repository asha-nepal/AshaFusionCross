/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('lodash.get');
jest.unmock('../DynamicForm');

import React from 'react';
import { shallow } from 'enzyme';

import { Form } from 'react-redux-form';
import { DynamicFormComponent, checkVisibility } from '../DynamicForm';

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
});

describe('checkVisibility', () => {
  it('returns false if `show` prop is false', () => {
    expect(checkVisibility({}, 'hoge', false)).toBe(false);
  });

  it('returns referred value if show prop is given as string', () => {
    const state = {
      root: {
        foo: {
          bar: true,
        },
        hoge: {
          fuga: false,
        },
      },
    };

    expect(checkVisibility(state, 'root', 'foo.bar')).toBe(true);
    expect(checkVisibility(state, 'root', 'hoge.fuga')).toBe(false);
  });

  it('handles Array as referent', () => {
    const state = {
      root: {
        foo: ['aaa', 'zzz'],
      },
    };

    expect(checkVisibility(state, 'root', 'foo:aaa')).toBe(true);
    expect(checkVisibility(state, 'root', 'foo:bbb')).toBe(false);
  });
});
