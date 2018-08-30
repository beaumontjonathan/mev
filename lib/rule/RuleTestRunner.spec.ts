import { expect } from 'chai';
import 'mocha';
import { emptyData, emptyFail, falsyTest, success, truthyTest } from '../test_helpers/rule';
import { DefaultValidationRuleError, ValidationRuleError } from '../types/ValidationRule';
import { RuleTestRunner } from './RuleTestRunner';

describe('RuleTestRunner', () => {
  describe('run', () => {
    it('should pass when there are no tests', () => {
      const testRunner = new RuleTestRunner();
      expect(testRunner.run(emptyData)).to.deep.equal(success);
    });

    describe('when a test fails, a default error should be returned', () => {
      it('should return an empty string title and description when tests fail without default options', () => {
        const testRunner = new RuleTestRunner();
        testRunner.addTest({ test: falsyTest });
        expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
      });

      it('should return the default error of a single failing with with such an option', () => {
        const testRunner = new RuleTestRunner();
        const defaultError: DefaultValidationRuleError = {
          title: 'test title',
          description: 'test description, typically more detailed',
        };
        const expectedError: ValidationRuleError = { success: false, ...defaultError };
        testRunner.addTest({
          test: falsyTest,
          defaultError,
        });
        expect(testRunner.run(emptyData)).to.deep.equal(expectedError);
      });

      it('should join the default errors of all failing tests with a comma when no defaultErrorJoiner option is' +
        'specified', () => {
        const testRunner = new RuleTestRunner();
        const defaultError1: DefaultValidationRuleError = {
          title: 'test title 1',
          description: 'test description 1',
        };
        const defaultError2: DefaultValidationRuleError = {
          title: 'test title 2',
          description: 'test description 2',
        };

        const expectedError: ValidationRuleError = {
          success: false,
          title: `${defaultError1.title}, ${defaultError2.title}`,
          description: `${defaultError1.description}, ${defaultError2.description}`,
        };

        testRunner.addTests([
          { test: falsyTest, defaultError: defaultError1 },
          { test: falsyTest, defaultError: defaultError2 },
        ]);

        expect(testRunner.run(emptyData)).to.deep.equal(expectedError);
      });

      it('should join the default errors of multiple failing tests with the defaultErrorJoiner option', () => {
        const testRunner = new RuleTestRunner({ defaultErrorJoiner: '; ' });
        const defaultError1: DefaultValidationRuleError = {
          title: 'test title 1',
          description: 'test description 1',
        };
        const defaultError2: DefaultValidationRuleError = {
          title: 'test title 2',
          description: 'test description 2',
        };

        const expectedError: ValidationRuleError = {
          success: false,
          title: `${defaultError1.title}; ${defaultError2.title}`,
          description: `${defaultError1.description}; ${defaultError2.description}`,
        };

        testRunner.addTests([
          { test: falsyTest, defaultError: defaultError1 },
          { test: falsyTest, defaultError: defaultError2 },
        ]);

        expect(testRunner.run(emptyData)).to.deep.equal(expectedError);
      });

      it('should join the default errors of only the failing tests', () => {
        const testRunner = new RuleTestRunner();
        const defaultError1: DefaultValidationRuleError = {
          title: 'test title 1 (failing)',
          description: 'test description 1',
        };
        const defaultError2: DefaultValidationRuleError = {
          title: 'test title 2 (succeeding)',
          description: 'test description 2',
        };
        const defaultError3: DefaultValidationRuleError = {
          title: 'test title 3 (failing)',
          description: 'test description 3',
        };

        const expectedError: ValidationRuleError = {
          success: false,
          title: `${defaultError1.title}, ${defaultError3.title}`,
          description: `${defaultError1.description}, ${defaultError3.description}`,
        };

        testRunner.addTests([
          { test: falsyTest, defaultError: defaultError1 },
          { test: truthyTest, defaultError: defaultError2 },
          { test: falsyTest, defaultError: defaultError3 },
        ]);

        expect(testRunner.run(emptyData)).to.deep.equal(expectedError);
      });
    });

    describe('failOnEmptyTestList option', () => {

      it('should pass on empty test list with option not set', () => {
        const testRunner = new RuleTestRunner();
        expect(testRunner.run(emptyData)).to.deep.equal(success);
      });

      it('should pass on empty test list when option set to false', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: false });
        expect(testRunner.run(emptyData)).to.deep.equal(success);
      });

      it('should fail on empty test list with option set to true', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: true });
        expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
      });

      it('should fail on falsy test list with option set to true', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: true });
        testRunner.addTest({ test: falsyTest });
        expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
      });

      it('should fail on falsy test list with option set to false', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: false });
        testRunner.addTest({ test: falsyTest });
        expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
      });

      it('should pass on truthy test list with option set to true', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: true });
        testRunner.addTest({ test: truthyTest });
        expect(testRunner.run(emptyData)).to.deep.equal(success);
      });

      it('should pass on truthy test list with option set to false', () => {
        const testRunner = new RuleTestRunner({ failOnEmptyTestList: false });
        testRunner.addTest({ test: truthyTest });
        expect(testRunner.run(emptyData)).to.deep.equal(success);
      });
    });
  });

  describe('addTest', () => {
    it('should pass a single truthy test', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTest({ test: truthyTest });
      expect(testRunner.run(emptyData)).to.deep.equal(success);
    });

    it('should pass on multiple truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTest({ test: truthyTest });
      testRunner.addTest({ test: truthyTest });
      testRunner.addTest({ test: truthyTest });
      testRunner.addTest({ test: truthyTest });
      expect(testRunner.run(emptyData)).to.deep.equal(success);
    });

    it('should fail a single falsy test', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTest({ test: falsyTest });
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });

    it('should fail on multiple truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: falsyTest });
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });

    it('should fail on mixed falsy and truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: truthyTest });
      testRunner.addTest({ test: falsyTest });
      testRunner.addTest({ test: truthyTest });
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });
  });

  describe('addTests', () => {
    it('should pass a single truthy test', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTests([{ test: truthyTest }]);
      expect(testRunner.run(emptyData)).to.deep.equal(success);
    });

    it('should pass on multiple truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTests([
        { test: truthyTest },
        { test: truthyTest },
        { test: truthyTest },
        { test: truthyTest },
      ]);
      expect(testRunner.run(emptyData)).to.deep.equal(success);
    });

    it('should fail a single falsy test', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTests([{ test: falsyTest }]);
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });

    it('should fail on multiple truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTests([
        { test: falsyTest },
        { test: falsyTest },
        { test: falsyTest },
        { test: falsyTest },
      ]);
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });

    it('should fail on mixed falsy and truthy tests', () => {
      const testRunner = new RuleTestRunner();
      testRunner.addTests([
        { test: falsyTest },
        { test: truthyTest },
        { test: falsyTest },
        { test: truthyTest },
      ]);
      expect(testRunner.run(emptyData)).to.deep.equal(emptyFail);
    });
  });
});
