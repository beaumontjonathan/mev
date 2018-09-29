"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../test_helpers/rule");
const Rule_1 = require("./Rule");
describe('Rule', () => {
    describe('title', () => {
        it('should return given error title when rule fails', () => {
            const ruleTitle = 'title of this rule';
            const rule = new Rule_1.Rule()
                .title(ruleTitle)
                .addTestFunction(rule_1.falsyTest);
            const expectedError = Object.assign({}, rule_1.emptyFail, { title: ruleTitle });
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(expectedError);
        });
        it('should return the latest error title in chain when rule fails', () => {
            const ignoredTitle = 'ignored title';
            const usedTitle = 'used title';
            const rule = new Rule_1.Rule()
                .title(ignoredTitle)
                .title(usedTitle)
                .addTestFunction(rule_1.falsyTest);
            const expectedError = Object.assign({}, rule_1.emptyFail, { title: usedTitle });
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(expectedError);
        });
    });
    describe('description', () => {
        it('should return given error description when rule fails', () => {
            const ruleDescription = 'description of this rule';
            const rule = new Rule_1.Rule()
                .description(ruleDescription)
                .addTestFunction(rule_1.falsyTest);
            const expectedError = Object.assign({}, rule_1.emptyFail, { description: ruleDescription });
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(expectedError);
        });
        it('should return the latest error description in chain when rule fails', () => {
            const ignoredDescription = 'ignored description';
            const usedDescription = 'used description';
            const rule = new Rule_1.Rule()
                .description(ignoredDescription)
                .description(usedDescription)
                .addTestFunction(rule_1.falsyTest);
            const expectedError = Object.assign({}, rule_1.emptyFail, { description: usedDescription });
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(expectedError);
        });
    });
    describe('addTestFunction', () => {
        it('should pass when no test functions are added', () => {
            const rule = new Rule_1.Rule();
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should pass when all test functions return true', () => {
            const rule = new Rule_1.Rule();
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should fail when any of the test functions returns false', () => {
            const rule = new Rule_1.Rule();
            rule.addTestFunction(rule_1.falsyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            rule.addTestFunction(rule_1.falsyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            rule.addTestFunction(rule_1.falsyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
        it('should fail once it has at least one falsy test', () => {
            const rule = new Rule_1.Rule();
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.success);
            rule.addTestFunction(rule_1.falsyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
            rule.addTestFunction(rule_1.truthyTest);
            chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(rule_1.emptyFail);
        });
    });
    describe('options', () => {
        describe('fieldName', () => {
            it('should prepend the field name to any error message and description on failure', () => {
                const rule = new Rule_1.Rule({ fieldName: 'username' })
                    .title('will fail')
                    .description('will fail, description')
                    .addTestFunction(rule_1.falsyTest);
                const expectedError = {
                    title: 'username will fail',
                    description: 'username will fail, description',
                };
                chai_1.expect(rule.test(rule_1.emptyData)).to.deep.equal(expectedError);
            });
        });
    });
});
//# sourceMappingURL=Rule.spec.js.map