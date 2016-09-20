/* eslint-env jest */

jest.unmock('../index');

import {
  convertToCsv,
} from '../index';

describe('convertToCsv()', () => {
  it('converts Array<Object> to CSV', () => {
    const data = [
      { id: 1, col1: 'hoge', col2: 'fuga' },
      { id: 2, col1: 'foo', col2: 'bar' },
    ];

    expect(convertToCsv(data))
      .toEqual(
`id,col1,col2
1,hoge,fuga
2,foo,bar`
      );
  });

  it('escapes double quotation', () => {
    const data = [
      { id: 1, text: '"Lorem ipsum" is\nwidely used dummy text.\tLorem ipsum.' },
    ];

    expect(convertToCsv(data))
      .toEqual(
`id,text
1,"""Lorem ipsum"" is
widely used dummy text.\tLorem ipsum."`
      );
  });

  it('adds double quotes if comma exists', () => {
    const data = [
      { id: 1, text: 'hoge, fuga, foo, bar' },
    ];

    expect(convertToCsv(data))
      .toEqual(
`id,text
1,"hoge, fuga, foo, bar"`
      );
  });
});
