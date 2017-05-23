/* eslint-env jest, jasmine */

jest.unmock('../db');

import {
  formatHostname,
} from '../db';

describe('formatHostname', () => {
  it('does nothing if scheme provided', () => {
    expect(formatHostname('http://example.com'))
      .toEqual('http://example.com');
    expect(formatHostname('https://example.com'))
      .toEqual('https://example.com');
    expect(formatHostname('https://example.com:6789'))
      .toEqual('https://example.com:6789');
  });

  it('adds http:// if protocol not provided', () => {
    expect(formatHostname('example.com'))
      .toEqual('http://example.com');
    expect(formatHostname('example.com:6789'))
      .toEqual('http://example.com:6789');
  });

  it('removes "/" at the end', () => {
    expect(formatHostname('example.com/'))
      .toEqual('http://example.com');
    expect(formatHostname('http://example.com/'))
      .toEqual('http://example.com');
    expect(formatHostname('http://example.com:6789/'))
      .toEqual('http://example.com:6789');
  });
});
