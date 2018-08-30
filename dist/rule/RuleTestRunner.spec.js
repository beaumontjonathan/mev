"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../test_helpers/rule");
const RuleTestRunner_1 = require("./RuleTestRunner");
describe('RuleTestRunner', () => {
    describe('run', () => {
        it('should pass when there are no tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        describe('when a test fails, a default error should be returned', () => {
            it('should return an empty string title and description when tests fail without default options', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner();
                testRunner.addTest({ test: rule_1.falsyTest });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            });
            it('should return the default error of a single failing with with such an option', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner();
                const defaultError = {
                    title: 'test title',
                    description: 'test description, typically more detailed',
                };
                const expectedError = Object.assign({ success: false }, defaultError);
                testRunner.addTest({
                    test: rule_1.falsyTest,
                    defaultError,
                });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(expectedError);
            });
            it('should join the default errors of all failing tests with a comma when no defaultErrorJoiner option is' +
                'specified', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner();
                const defaultError1 = {
                    title: 'test title 1',
                    description: 'test description 1',
                };
                const defaultError2 = {
                    title: 'test title 2',
                    description: 'test description 2',
                };
                const expectedError = {
                    success: false,
                    title: `${defaultError1.title}, ${defaultError2.title}`,
                    description: `${defaultError1.description}, ${defaultError2.description}`,
                };
                testRunner.addTests([
                    { test: rule_1.falsyTest, defaultError: defaultError1 },
                    { test: rule_1.falsyTest, defaultError: defaultError2 },
                ]);
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(expectedError);
            });
            it('should join the default errors of multiple failing tests with the defaultErrorJoiner option', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ defaultErrorJoiner: '; ' });
                const defaultError1 = {
                    title: 'test title 1',
                    description: 'test description 1',
                };
                const defaultError2 = {
                    title: 'test title 2',
                    description: 'test description 2',
                };
                const expectedError = {
                    success: false,
                    title: `${defaultError1.title}; ${defaultError2.title}`,
                    description: `${defaultError1.description}; ${defaultError2.description}`,
                };
                testRunner.addTests([
                    { test: rule_1.falsyTest, defaultError: defaultError1 },
                    { test: rule_1.falsyTest, defaultError: defaultError2 },
                ]);
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(expectedError);
            });
            it('should join the default errors of only the failing tests', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner();
                const defaultError1 = {
                    title: 'test title 1 (failing)',
                    description: 'test description 1',
                };
                const defaultError2 = {
                    title: 'test title 2 (succeeding)',
                    description: 'test description 2',
                };
                const defaultError3 = {
                    title: 'test title 3 (failing)',
                    description: 'test description 3',
                };
                const expectedError = {
                    success: false,
                    title: `${defaultError1.title}, ${defaultError3.title}`,
                    description: `${defaultError1.description}, ${defaultError3.description}`,
                };
                testRunner.addTests([
                    { test: rule_1.falsyTest, defaultError: defaultError1 },
                    { test: rule_1.truthyTest, defaultError: defaultError2 },
                    { test: rule_1.falsyTest, defaultError: defaultError3 },
                ]);
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(expectedError);
            });
        });
        describe('failOnEmptyTestList option', () => {
            it('should pass on empty test list with option not set', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner();
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
            });
            it('should pass on empty test list when option set to false', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: false });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
            });
            it('should fail on empty test list with option set to true', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: true });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            });
            it('should fail on falsy test list with option set to true', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: true });
                testRunner.addTest({ test: rule_1.falsyTest });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            });
            it('should fail on falsy test list with option set to false', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: false });
                testRunner.addTest({ test: rule_1.falsyTest });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            });
            it('should pass on truthy test list with option set to true', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: true });
                testRunner.addTest({ test: rule_1.truthyTest });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
            });
            it('should pass on truthy test list with option set to false', () => {
                const testRunner = new RuleTestRunner_1.RuleTestRunner({ failOnEmptyTestList: false });
                testRunner.addTest({ test: rule_1.truthyTest });
                chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
            });
        });
    });
    describe('addTest', () => {
        it('should pass a single truthy test', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTest({ test: rule_1.truthyTest });
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should pass on multiple truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTest({ test: rule_1.truthyTest });
            testRunner.addTest({ test: rule_1.truthyTest });
            testRunner.addTest({ test: rule_1.truthyTest });
            testRunner.addTest({ test: rule_1.truthyTest });
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should fail a single falsy test', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTest({ test: rule_1.falsyTest });
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
        it('should fail on multiple truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.falsyTest });
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
        it('should fail on mixed falsy and truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.truthyTest });
            testRunner.addTest({ test: rule_1.falsyTest });
            testRunner.addTest({ test: rule_1.truthyTest });
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
    });
    describe('addTests', () => {
        it('should pass a single truthy test', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTests([{ test: rule_1.truthyTest }]);
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should pass on multiple truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTests([
                { test: rule_1.truthyTest },
                { test: rule_1.truthyTest },
                { test: rule_1.truthyTest },
                { test: rule_1.truthyTest },
            ]);
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should fail a single falsy test', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTests([{ test: rule_1.falsyTest }]);
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
        it('should fail on multiple truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTests([
                { test: rule_1.falsyTest },
                { test: rule_1.falsyTest },
                { test: rule_1.falsyTest },
                { test: rule_1.falsyTest },
            ]);
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
        it('should fail on mixed falsy and truthy tests', () => {
            const testRunner = new RuleTestRunner_1.RuleTestRunner();
            testRunner.addTests([
                { test: rule_1.falsyTest },
                { test: rule_1.truthyTest },
                { test: rule_1.falsyTest },
                { test: rule_1.truthyTest },
            ]);
            chai_1.expect(testRunner.run(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
    });
});
//# sourceMappingURL=RuleTestRunner.spec.js.map