/* @flow */
/* eslint-env jest */

jest.unmock('../Summary');

import { shallow } from 'enzyme';
import React from 'react';

import Summary from '../Summary';
import { convertToCsv } from '../../../utils';
import { downloadBlob } from '../../../utils/web';

describe('<Summary />', () => {
  it('has CSV downloading button', () => {
    const wrapper = shallow(<Summary
      columns={[]}
      records={[]}
    />);

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const button = wrapper.find('a').at(0);
    button.simulate('click', mockEvent);

    expect(mockEvent.preventDefault).toBeCalled();
    expect(convertToCsv).toBeCalled();
    expect(downloadBlob).toBeCalled();
  });
});
