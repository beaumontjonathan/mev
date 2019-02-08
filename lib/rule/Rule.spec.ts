import { expect } from 'chai';
import 'mocha';
import { emptyData, emptyFail, falsyTest, success, truthyTest } from '../test_helpers/rule';
import { ValidationRuleError } from '../types';
import { Rule } from './Rule';

describe('Rule', () => {
  describe('title', () => {
    it('should return given error title when rule fails', () => {
      const ruleTitle = 'title of this rule';
      const rule = new Rule()
        .title(ruleTitle)
        .addTestFunction(falsyTest);

      const expectedError: ValidationRuleError = { ...emptyFail, title: ruleTitle };

      expect(rule.test(emptyData)).to.deep.equal(expectedError);
    });

    it('should return the latest error title in chain when rule fails', () => {
      const ignoredTitle = 'ignored title';
      const usedTitle = 'used title';
      const rule = new Rule()
        .title(ignoredTitle)
        .title(usedTitle)
        .addTestFunction(falsyTest);

      const expectedError: ValidationRuleError = { ...emptyFail, title: usedTitle };

      expect(rule.test(emptyData)).to.deep.equal(expectedError);
    });
  });

  describe('description', () => {
    it('should return given error description when rule fails', () => {
      const ruleDescription = 'description of this rule';
      const rule = new Rule()
        .description(ruleDescription)
        .addTestFunction(falsyTest);

      const expectedError: ValidationRuleError = { ...emptyFail, description: ruleDescription };

      expect(rule.test(emptyData)).to.deep.equal(expectedError);
    });

    it('should return the latest error description in chain when rule fails', () => {
      const ignoredDescription = 'ignored description';
      const usedDescription = 'used description';
      const rule = new Rule()
        .description(ignoredDescription)
        .description(usedDescription)
        .addTestFunction(falsyTest);

      const expectedError: ValidationRuleError = { ...emptyFail, description: usedDescription };

      expect(rule.test(emptyData)).to.deep.equal(expectedError);
    });
  });

  describe('addTestFunction', () => {
    it('should pass when no test functions are added', () => {
      const rule = new Rule();

      expect(rule.test(emptyData)).to.deep.equal(success);
    });

    it('should pass when all test functions return true', () => {
      const rule = new Rule();

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(success);

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(success);

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(success);

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(success);
    });

    it('should fail when any of the test functions returns false', () => {
      const rule = new Rule();

      rule.addTestFunction(falsyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);

      rule.addTestFunction(falsyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);

      rule.addTestFunction(falsyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);
    });

    it('should fail once it has at least one falsy test', () => {
      const rule = new Rule();

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(success);

      rule.addTestFunction(falsyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);

      rule.addTestFunction(truthyTest);
      expect(rule.test(emptyData)).to.deep.equal(emptyFail);
    });
  });

  describe('options', () => {
    describe('fieldName', () => {
      it('should prepend the field name to any error message and description on failure', () => {
        const rule = new Rule({ fieldName: 'username', useFieldName: true })
          .title('will fail')
          .description('will fail, description')
          .addTestFunction(falsyTest);

        const expectedError: ValidationRuleError = {
          title: 'username will fail',
          description: 'username will fail, description',
        };

        expect(rule.test(emptyData)).to.deep.equal(expectedError);
      });
    });
  });
});
