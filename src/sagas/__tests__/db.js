/* eslint-env jest, jasmine */

jest.unmock('../db');

import {
  formatHostname,
} from '../db';

describe('formatHostname', () => {
  it('does nothing if port number provided', () => {
    expect(formatHostname('example.com:6789'))
      .toEqual('example.com:6789');
  });

  it('adds port 5984 if not port number provided', () => {
    expect(formatHostname('example.com'))
      .toEqual('example.com:5984');
  });
});
