/* eslint-env jest */
jest.unmock('../Modal');

import { shallow } from 'enzyme';
import React from 'react';

import Modal from '../Modal';

describe('<Modal />', () => {
  it('contains child component', () => {
    const wrapper = shallow(
      <Modal>
        <div id="foo">bar</div>
      </Modal>
    );

    expect(wrapper.contains(<div id="foo">bar</div>)).toBe(true);
  });

  it('contains close button and onClose() callback is fired when it clicked', () => {
    const ev = { preventDefault: jest.fn() };
    const onClose = jest.fn();

    const wrapper = shallow(
      <Modal
        onClose={onClose}
      />
    );

    expect(wrapper.find('button').length).toBe(1);
    wrapper.find('button').at(0).simulate('click', ev);
    expect(ev.preventDefault).toBeCalled();
    expect(onClose).toBeCalled();
  });

  it('does not have close button if onClose prop is not provided', () => {
    const wrapper = shallow(
      <Modal />
    );

    expect(wrapper.find('button').length).toBe(0);
  });
});
