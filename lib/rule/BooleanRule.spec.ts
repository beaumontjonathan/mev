import { expect } from 'chai';
import 'mocha';
import { success } from '../test_helpers/rule';
import { ValidationRuleError } from '../types';
import { BooleanRule } from './BooleanRule';

describe('BooleanRule', () => {
  describe('true', () => {
    it('should succeed if the input is true', () => {
      const rule = new BooleanRule().true();

      expect(rule.test(true)).to.deep.equal(success);
    });

    it('should fail if the input is false', () => {
      const rule = new BooleanRule().true();

      const expectedError: ValidationRuleError = {
        title: 'not true',
        description: 'must be true',
      };

      expect(rule.test(false)).to.deep.equal(expectedError);
    });
  });

  describe('false', () => {
    it('should succeed if the input is false', () => {
      const rule = new BooleanRule().false();

      expect(rule.test(false)).to.deep.equal(success);
    });

    it('should fail if the input is true', () => {
      const rule = new BooleanRule().false();

      const expectedError: ValidationRuleError = {
        title: 'not false',
        description: 'must be false',
      };

      expect(rule.test(true)).to.deep.equal(expectedError);
    });
  });
});
