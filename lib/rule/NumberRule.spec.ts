import { expect } from 'chai';
import 'mocha';
import { success } from '../test_helpers/rule';
import { ValidationRuleError } from '../types/ValidationRule';
import { NumberRule } from './NumberRule';

describe('NumberRule', () => {
  describe('min', () => {
    it('should reject numbers smaller than the minimum', () => {
      const rule = new NumberRule().min(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'less than minimum',
        description: 'must be greater than the minimum value of 5',
      };

      expect(rule.test(4)).to.deep.equal(expectedError);
    });

    it('should accept numbers equal to the minimum', () => {
      const rule = new NumberRule().min(5);

      expect(rule.test(5)).to.deep.equal(success);
    });

    it('should accept numbers greater than the minimum', () => {
      const rule = new NumberRule().min(5);

      expect(rule.test(6)).to.deep.equal(success);
    });
  });

  describe('closed min', () => {
    it('should reject numbers smaller than the minimum', () => {
      const rule = new NumberRule().closedMin(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'less than minimum',
        description: 'must be greater than the minimum value of 5',
      };

      expect(rule.test(4)).to.deep.equal(expectedError);
    });

    it('should accept numbers equal to the minimum', () => {
      const rule = new NumberRule().closedMin(5);

      expect(rule.test(5)).to.deep.equal(success);
    });

    it('should accept numbers greater than the minimum', () => {
      const rule = new NumberRule().closedMin(5);

      expect(rule.test(6)).to.deep.equal(success);
    });
  });

  describe('open min', () => {
    it('should reject numbers smaller than the minimum', () => {
      const rule = new NumberRule().openMin(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'less than or equal to minimum',
        description: 'must be greater than the open minimum value of 5',
      };

      expect(rule.test(4)).to.deep.equal(expectedError);
    });

    it('should reject numbers equal to the minimum', () => {
      const rule = new NumberRule().openMin(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'less than or equal to minimum',
        description: 'must be greater than the open minimum value of 5',
      };

      expect(rule.test(5)).to.deep.equal(expectedError);
    });

    it('should accept numbers greater than the minimum', () => {
      const rule = new NumberRule().openMin(5);

      expect(rule.test(6)).to.deep.equal(success);
    });
  });

  describe('max', () => {
    it('should reject numbers greater than the maximum', () => {
      const rule = new NumberRule().max(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'greater than maximum',
        description: 'must be less than the maximum value of 5',
      };

      expect(rule.test(6)).to.deep.equal(expectedError);
    });

    it('should accept numbers equal to the maximum', () => {
      const rule = new NumberRule().max(5);

      expect(rule.test(5)).to.deep.equal(success);
    });

    it('should accept numbers less than the maximum', () => {
      const rule = new NumberRule().max(5);

      expect(rule.test(4)).to.deep.equal(success);
    });
  });

  describe('closed max', () => {
    it('should reject numbers greater than the maximum', () => {
      const rule = new NumberRule().closedMax(5);

      const expectedError: ValidationRuleError = {
        success: false,
        title: 'greater than maximum',
        description: 'must be less than the maximum value of 5',
      };

      expect(rule.test(6)).to.deep.equal(expectedError);
    });

    it('should accept numbers equal to the maximum', () => {
      const rule = new NumberRule().closedMax(5);

      expect(rule.test(5)).to.deep.equal(success);
    });

    it('should accept numbers less than the maximum', () => {
      const rule = new NumberRule().closedMax(5);

      expect(rule.test(4)).to.deep.equal(success);
    });
  });

  describe('open max', () => {
    const expectedError: ValidationRuleError = {
      success: false,
      title: 'greater than or equal to maximum',
      description: 'must be less than the open maximum value of 5',
    };

    it('should reject numbers greater than the maximum', () => {
      const rule = new NumberRule().openMax(5);

      expect(rule.test(6)).to.deep.equal(expectedError);
    });

    it('should reject numbers equal to the minimum', () => {
      const rule = new NumberRule().openMax(5);

      expect(rule.test(5)).to.deep.equal(expectedError);
    });

    it('should accept numbers less than the maximum', () => {
      const rule = new NumberRule().openMax(5);

      expect(rule.test(4)).to.deep.equal(success);
    });
  });

  describe('closedInterval', () => {
    const expectedError: ValidationRuleError = {
      success: false,
      title: 'outside closed interval',
      description: 'outside of the closed interval of [2,4]',
    };

    it('should reject numbers less than the minimum', () => {
      const rule = new NumberRule().closedInterval(2, 4);

      expect(rule.test(1)).to.deep.equal(expectedError);
    });

    it('should accept numbers equal to the minimum', () => {
      const rule = new NumberRule().closedInterval(2, 4);

      expect(rule.test(2)).to.deep.equal(success);
    });

    it('should accept numbers between the minimum and maximum', () => {
      const rule = new NumberRule().closedInterval(2, 4);

      expect(rule.test(3)).to.deep.equal(success);
    });

    it('should accept numbers equal to the maximum', () => {
      const rule = new NumberRule().closedInterval(2, 4);

      expect(rule.test(4)).to.deep.equal(success);
    });

    it('should reject numbers greater than the maximum', () => {
      const rule = new NumberRule().closedInterval(2, 4);

      expect(rule.test(5)).to.deep.equal(expectedError);
    });
  });

  describe('openInterval', () => {
    const expectedError: ValidationRuleError = {
      success: false,
      title: 'outside open interval',
      description: 'outside of the open interval of (2,4)',
    };

    it('should reject numbers less than the minimum', () => {
      const rule = new NumberRule().openInterval(2, 4);

      expect(rule.test(1)).to.deep.equal(expectedError);
    });

    it('should reject numbers equal to the minimum', () => {
      const rule = new NumberRule().openInterval(2, 4);

      expect(rule.test(2)).to.deep.equal(expectedError);
    });

    it('should accept numbers between the minimum and maximum', () => {
      const rule = new NumberRule().openInterval(2, 4);

      expect(rule.test(3)).to.deep.equal(success);
    });

    it('should reject numbers equal to the maximum', () => {
      const rule = new NumberRule().openInterval(2, 4);

      expect(rule.test(4)).to.deep.equal(expectedError);
    });

    it('should reject numbers greater than the maximum', () => {
      const rule = new NumberRule().openInterval(2, 4);

      expect(rule.test(5)).to.deep.equal(expectedError);
    });
  });
});
