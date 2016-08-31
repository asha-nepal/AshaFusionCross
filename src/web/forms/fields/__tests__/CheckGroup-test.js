/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../CheckGroup');

import { shallow } from 'enzyme';
import React from 'react';

import { CheckGroupComponent } from '../CheckGroup';

describe('<CheckGroupComponent />', () => {
  it('adds value as unchecked button is clicked', () => {
    const mockOnChange = jest.fn();
    const mockEventObject = {
      preventDefault: jest.fn(),
    };

    const wrapper = shallow(<CheckGroupComponent
      value={['a']}
      options={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ]}
      onChange={mockOnChange}
    />);

    wrapper.find('a').at(1)
      .simulate('click', mockEventObject);
    expect(mockOnChange).toBeCalledWith(['a', 'b']);
  });

  it('removes value as checked button is clicked', () => {
    const mockOnChange = jest.fn();
    const mockEventObject = {
      preventDefault: jest.fn(),
    };

    const wrapper = shallow(<CheckGroupComponent
      value={['a', 'b']}
      options={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ]}
      onChange={mockOnChange}
    />);

    wrapper.find('a').at(1)
      .simulate('click', mockEventObject);
    expect(mockOnChange).toBeCalledWith(['a']);
  });
});
