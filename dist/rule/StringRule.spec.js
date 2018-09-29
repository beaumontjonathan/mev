"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../test_helpers/rule");
const StringRule_1 = require("./StringRule");
describe('StringRule', () => {
    context('when testing non-string inputs', () => {
        const getExpectedError = (type) => ({
            title: `type must be string`,
            description: `must have type 'string' but was really of type '${type}'`,
        });
        it('should not run other test functions', () => {
            let flag = false;
            const testFunction = (d) => {
                flag = true;
                return true;
            };
            const rule = new StringRule_1.StringRule()
                .addTestFunction(testFunction);
            rule.test(undefined);
            chai_1.expect(flag).to.equal(false);
            rule.test('asdf');
            chai_1.expect(flag).to.equal(true);
        });
        it('should not throw "cannot read property of undefined" type error', () => {
            const rule = new StringRule_1.StringRule().addTestFunction((d) => d.trim() && true);
            chai_1.expect(() => rule.test(undefined)).not.to.throw(TypeError);
        });
        it('should fail with undefined/null values', () => {
            const rule = new StringRule_1.StringRule();
            chai_1.expect(rule.test(undefined)).to.deep.equal(getExpectedError('undefined'));
            chai_1.expect(rule.test(null)).to.deep.equal(getExpectedError('object'));
        });
        it('should fail with number values', () => {
            const rule = new StringRule_1.StringRule();
            // @ts-ignore
            chai_1.expect(rule.test(4)).to.deep.equal(getExpectedError('number'));
            // @ts-ignore
            chai_1.expect(rule.test(Number(4))).to.deep.equal(getExpectedError('number'));
        });
        it('should fail with array/object values', () => {
            const rule = new StringRule_1.StringRule();
            // @ts-ignore
            chai_1.expect(rule.test([])).to.deep.equal(getExpectedError(typeof []));
            // @ts-ignore
            chai_1.expect(rule.test({})).to.deep.equal(getExpectedError(typeof {}));
        });
        it('may only pass with string values', () => {
            const rule = new StringRule_1.StringRule();
            chai_1.expect(rule.test('sdf')).to.deep.equal(rule_1.success);
        });
    });
    describe('minLength', () => {
        it('should reject strings shorter than the minimum length', () => {
            const rule = new StringRule_1.StringRule().minLength(4);
            const expectedError = {
                title: 'too short',
                description: 'must be at least 4 characters long',
            };
            chai_1.expect(rule.test('hel')).to.deep.equal(expectedError);
        });
        it('should accept strings with the minimum length', () => {
            const rule = new StringRule_1.StringRule().minLength(4);
            chai_1.expect(rule.test('hell')).to.deep.equal(rule_1.success);
        });
        it('should accept strings longer than the minimum length', () => {
            const rule = new StringRule_1.StringRule().minLength(4);
            chai_1.expect(rule.test('hello')).to.deep.equal(rule_1.success);
        });
    });
    describe('maxLength', () => {
        it('should reject strings longer than the maximum length', () => {
            const rule = new StringRule_1.StringRule().maxLength(4);
            const expectedError = {
                title: 'too long',
                description: 'must not be longer than 4 characters long',
            };
            chai_1.expect(rule.test('hello')).to.deep.equal(expectedError);
        });
        it('should accept strings with the maximum length', () => {
            const rule = new StringRule_1.StringRule().maxLength(4);
            chai_1.expect(rule.test('hell')).to.deep.equal(rule_1.success);
        });
        it('should accept strings shorter than the maximum length', () => {
            const rule = new StringRule_1.StringRule().maxLength(4);
            chai_1.expect(rule.test('hel')).to.deep.equal(rule_1.success);
        });
    });
    describe('blacklist', () => {
        it('should fail when at least one item from the blacklist is a substring of the input', () => {
            const rule = new StringRule_1.StringRule().blacklist(['hello', 'world']);
            const expectedError = {
                title: 'failed blacklist',
                description: 'must not contain one of the blacklisted phrases \'hello\', \'world\'',
            };
            chai_1.expect(rule.test('hello github')).to.deep.equal(expectedError);
        });
        it('should pass when none of the blacklist items is a substring of the input', () => {
            const rule = new StringRule_1.StringRule().blacklist(['hello', 'world']);
            chai_1.expect(rule.test('hey github')).to.deep.equal(rule_1.success);
        });
    });
    describe('upperCase', () => {
        it('should allow strings without lowercase letters', () => {
            const rule = new StringRule_1.StringRule().upperCase();
            chai_1.expect(rule.test('ASDF')).to.deep.equal(rule_1.success);
        });
        it('should reject strings with lowercase letters', () => {
            const rule = new StringRule_1.StringRule().upperCase();
            const expectedError = {
                title: 'contains lowercase',
                description: 'must not contain lowercase characters',
            };
            chai_1.expect(rule.test('asdf')).to.deep.equal(expectedError);
        });
        it('should always accept the empty string', () => {
            const rule = new StringRule_1.StringRule().alphanumeric();
            chai_1.expect(rule.test('')).to.deep.equal(rule_1.success);
        });
    });
    describe('lowerCase', () => {
        it('should allow strings without uppercase letters', () => {
            const rule = new StringRule_1.StringRule().lowerCase();
            chai_1.expect(rule.test('asdf')).to.deep.equal(rule_1.success);
        });
        it('should reject strings with uppercase letters', () => {
            const rule = new StringRule_1.StringRule().lowerCase();
            const expectedError = {
                title: 'contains uppercase',
                description: 'must not contain uppercase characters',
            };
            chai_1.expect(rule.test('ASDF')).to.deep.equal(expectedError);
        });
        it('should always accept the empty string', () => {
            const rule = new StringRule_1.StringRule().alphanumeric();
            chai_1.expect(rule.test('')).to.deep.equal(rule_1.success);
        });
    });
    describe('alphanumeric', () => {
        it('should allow alphanumeric string', () => {
            const rule = new StringRule_1.StringRule().alphanumeric();
            chai_1.expect(rule.test('asDF1')).to.deep.equal(rule_1.success);
        });
        it('should reject strings including non-alphanumeric characters', () => {
            const rule = new StringRule_1.StringRule().alphanumeric();
            const expectedError = {
                title: 'not alphanumeric',
                description: 'must only contain letters and numbers',
            };
            chai_1.expect(rule.test('!')).to.deep.equal(expectedError);
        });
        it('should always accept the empty string', () => {
            const rule = new StringRule_1.StringRule().alphanumeric();
            chai_1.expect(rule.test('')).to.deep.equal(rule_1.success);
        });
    });
    describe('regex', () => {
        it('should pass on succeeding regular expressions', () => {
            const succeedingRegex = /^.*$/;
            const rule = new StringRule_1.StringRule().regex(succeedingRegex);
            chai_1.expect(rule.test('')).to.deep.equal(rule_1.success);
        });
        it('should fail on failing regular expressions', () => {
            const failingRegex = /blablabla/;
            const rule = new StringRule_1.StringRule().regex(failingRegex);
            const expectedError = {
                title: 'failed regex',
                description: 'failed the regular expression \'/blablabla/\'',
            };
            chai_1.expect(rule.test('')).to.deep.equal(expectedError);
        });
    });
});
//# sourceMappingURL=StringRule.spec.js.map