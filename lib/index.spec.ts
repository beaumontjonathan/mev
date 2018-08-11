import 'mocha';
import { expect } from 'chai';
import add from './index';

describe('add', () => {
  it('should add even numbers', () => {
    expect(add(1, 2)).to.equal(3);
  });
});