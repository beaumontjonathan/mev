import { expect } from 'chai';
import 'mocha';
import { success } from '../test_helpers/rule';
import { ValidationRuleError } from '../types';
import { StringRule } from './StringRule';

describe('StringRule', () => {
  context('when testing non-string inputs', () => {
    const getExpectedError: (type: string) => ValidationRuleError = (type: string) => ({
      title: `type must be string`,
      description: `must have type 'string' but was really of type '${type}'`,
    });

    it('should not run other test functions', () => {
      let flag: boolean = false;
      const testFunction: (d: any) => boolean = (d: any) => {
        flag = true;
        return true;
      };

      const rule: StringRule = new StringRule()
        .addTestFunction(testFunction);

      rule.test(undefined);
      expect(flag).to.equal(false);

      rule.test('asdf');
      expect(flag).to.equal(true);
    });

    it('should not throw "cannot read property of undefined" type error', () => {
      const rule: StringRule = new StringRule().addTestFunction((d: string) => d.trim() && true);

      expect(() => rule.test(undefined)).not.to.throw(TypeError);
    });

    it('should fail with undefined/null values', () => {
      const rule = new StringRule();

      expect(rule.test(undefined)).to.deep.equal(getExpectedError('undefined'));
      expect(rule.test(null)).to.deep.equal(getExpectedError('object'));
    });

    it('should fail with number values', () => {
      const rule = new StringRule();

      // @ts-ignore
      expect(rule.test(4)).to.deep.equal(getExpectedError('number'));
      // @ts-ignore
      expect(rule.test(Number(4))).to.deep.equal(getExpectedError('number'));
    });

    it('should fail with array/object values', () => {
      const rule = new StringRule();

      // @ts-ignore
      expect(rule.test([])).to.deep.equal(getExpectedError(typeof []));
      // @ts-ignore
      expect(rule.test({})).to.deep.equal(getExpectedError(typeof {}));
    });

    it('may only pass with string values', () => {
      const rule = new StringRule();

      expect(rule.test('sdf')).to.deep.equal(success);
    });
  });

  describe('minLength', () => {
    it('should reject strings shorter than the minimum length', () => {
      const rule = new StringRule().minLength(4);

      const expectedError: ValidationRuleError = {
        title: 'too short',
        description: 'must be at least 4 characters long',
      };

      expect(rule.test('hel')).to.deep.equal(expectedError);
    });

    it('should accept strings with the minimum length', () => {
      const rule = new StringRule().minLength(4);

      expect(rule.test('hell')).to.deep.equal(success);
    });

    it('should accept strings longer than the minimum length', () => {
      const rule = new StringRule().minLength(4);

      expect(rule.test('hello')).to.deep.equal(success);
    });
  });

  describe('maxLength', () => {
    it('should reject strings longer than the maximum length', () => {
      const rule = new StringRule().maxLength(4);

      const expectedError: ValidationRuleError = {
        title: 'too long',
        description: 'must not be longer than 4 characters long',
      };

      expect(rule.test('hello')).to.deep.equal(expectedError);
    });

    it('should accept strings with the maximum length', () => {
      const rule = new StringRule().maxLength(4);

      expect(rule.test('hell')).to.deep.equal(success);
    });

    it('should accept strings shorter than the maximum length', () => {
      const rule = new StringRule().maxLength(4);

      expect(rule.test('hel')).to.deep.equal(success);
    });
  });

  describe('blacklist', () => {
    it('should fail when at least one item from the blacklist is a substring of the input', () => {
      const rule = new StringRule().blacklist(['hello', 'world']);

      const expectedError: ValidationRuleError = {
        title: 'failed blacklist',
        description: 'must not contain one of the blacklisted phrases \'hello\', \'world\'',
      };

      expect(rule.test('hello github')).to.deep.equal(expectedError);
    });

    it('should pass when none of the blacklist items is a substring of the input', () => {
      const rule = new StringRule().blacklist(['hello', 'world']);

      expect(rule.test('hey github')).to.deep.equal(success);
    });
  });

  describe('upperCase', () => {
    it('should allow strings without lowercase letters', () => {
      const rule = new StringRule().upperCase();

      expect(rule.test('ASDF')).to.deep.equal(success);
    });

    it('should reject strings with lowercase letters', () => {
      const rule = new StringRule().upperCase();

      const expectedError: ValidationRuleError = {
        title: 'contains lowercase',
        description: 'must not contain lowercase characters',
      };

      expect(rule.test('asdf')).to.deep.equal(expectedError);
    });

    it('should always accept the empty string', () => {
      const rule = new StringRule().alphanumeric();

      expect(rule.test('')).to.deep.equal(success);
    });
  });

  describe('lowerCase', () => {
    it('should allow strings without uppercase letters', () => {
      const rule = new StringRule().lowerCase();

      expect(rule.test('asdf')).to.deep.equal(success);
    });

    it('should reject strings with uppercase letters', () => {
      const rule = new StringRule().lowerCase();

      const expectedError: ValidationRuleError = {
        title: 'contains uppercase',
        description: 'must not contain uppercase characters',
      };

      expect(rule.test('ASDF')).to.deep.equal(expectedError);
    });

    it('should always accept the empty string', () => {
      const rule = new StringRule().alphanumeric();

      expect(rule.test('')).to.deep.equal(success);
    });
  });

  describe('alphanumeric', () => {
    it('should allow alphanumeric string', () => {
      const rule = new StringRule().alphanumeric();

      expect(rule.test('asDF1')).to.deep.equal(success);
    });

    it('should reject strings including non-alphanumeric characters', () => {
      const rule = new StringRule().alphanumeric();

      const expectedError: ValidationRuleError = {
        title: 'not alphanumeric',
        description: 'must only contain letters and numbers',
      };

      expect(rule.test('!')).to.deep.equal(expectedError);
    });

    it('should always accept the empty string', () => {
      const rule = new StringRule().alphanumeric();

      expect(rule.test('')).to.deep.equal(success);
    });
  });

  describe('regex', () => {
    it('should pass on succeeding regular expressions', () => {
      const succeedingRegex = /^.*$/;
      const rule = new StringRule().regex(succeedingRegex);

      expect(rule.test('')).to.deep.equal(success);
    });

    it('should fail on failing regular expressions', () => {
      const failingRegex = /blablabla/;
      const rule = new StringRule().regex(failingRegex);

      const expectedError: ValidationRuleError = {
        title: 'failed regex',
        description: 'failed the regular expression \'/blablabla/\'',
      };

      expect(rule.test('')).to.deep.equal(expectedError);
    });
  });
});
