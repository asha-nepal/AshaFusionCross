/**
 * Copyright 2018 Yuichiro Tsuchiya
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

import React from 'react';
import { shallow } from 'enzyme';

import Row, { fieldComponents } from '../Row';

jest.unmock('react-redux');
jest.unmock('lodash.get');
jest.unmock('lodash.set');
jest.unmock('../Row');
jest.unmock('../../common/fieldify');

describe('<SubformList.Row />', () => {
  it('renders child components, distributes their values, and handles their onChanges', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <Row
        value={{
          foo: 'FOO',
          bar: {
            baz: 'BARBAZ',
          },
        }}
        fields={[
          {
            field: 'foo',
            class: 'textinput',
          },
          {
            field: 'bar.baz',
            class: 'textinput',
          },
        ]}
        onChange={onChange}
      />,
    );

    const textInputs = wrapper.find(fieldComponents.textinput);

    expect(textInputs.length).toBe(2);
    expect(textInputs.at(0).prop('value')).toEqual('FOO');
    expect(textInputs.at(1).prop('value')).toEqual('BARBAZ');

    textInputs.at(0).prop('onChange')('newFOO');
    expect(onChange.mock.calls[0]).toEqual(['foo', 'newFOO']);

    textInputs.at(1).prop('onChange')('newBARBAZ');
    expect(onChange.mock.calls[1]).toEqual(['bar.baz', 'newBARBAZ']);
  });
});
