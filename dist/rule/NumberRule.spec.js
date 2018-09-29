"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../test_helpers/rule");
const NumberRule_1 = require("./NumberRule");
describe('NumberRule', () => {
    describe('min', () => {
        it('should reject numbers smaller than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().min(5);
            const expectedError = {
                title: 'less than minimum',
                description: 'must be greater than the minimum value of 5',
            };
            chai_1.expect(rule.test(4)).to.deep.equal(expectedError);
        });
        it('should accept numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().min(5);
            chai_1.expect(rule.test(5)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers greater than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().min(5);
            chai_1.expect(rule.test(6)).to.deep.equal(rule_1.success);
        });
    });
    describe('closed min', () => {
        it('should reject numbers smaller than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().closedMin(5);
            const expectedError = {
                title: 'less than minimum',
                description: 'must be greater than the minimum value of 5',
            };
            chai_1.expect(rule.test(4)).to.deep.equal(expectedError);
        });
        it('should accept numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().closedMin(5);
            chai_1.expect(rule.test(5)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers greater than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().closedMin(5);
            chai_1.expect(rule.test(6)).to.deep.equal(rule_1.success);
        });
    });
    describe('open min', () => {
        it('should reject numbers smaller than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openMin(5);
            const expectedError = {
                title: 'less than or equal to minimum',
                description: 'must be greater than the open minimum value of 5',
            };
            chai_1.expect(rule.test(4)).to.deep.equal(expectedError);
        });
        it('should reject numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openMin(5);
            const expectedError = {
                title: 'less than or equal to minimum',
                description: 'must be greater than the open minimum value of 5',
            };
            chai_1.expect(rule.test(5)).to.deep.equal(expectedError);
        });
        it('should accept numbers greater than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openMin(5);
            chai_1.expect(rule.test(6)).to.deep.equal(rule_1.success);
        });
    });
    describe('max', () => {
        it('should reject numbers greater than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().max(5);
            const expectedError = {
                title: 'greater than maximum',
                description: 'must be less than the maximum value of 5',
            };
            chai_1.expect(rule.test(6)).to.deep.equal(expectedError);
        });
        it('should accept numbers equal to the maximum', () => {
            const rule = new NumberRule_1.NumberRule().max(5);
            chai_1.expect(rule.test(5)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers less than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().max(5);
            chai_1.expect(rule.test(4)).to.deep.equal(rule_1.success);
        });
    });
    describe('closed max', () => {
        it('should reject numbers greater than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedMax(5);
            const expectedError = {
                title: 'greater than maximum',
                description: 'must be less than the maximum value of 5',
            };
            chai_1.expect(rule.test(6)).to.deep.equal(expectedError);
        });
        it('should accept numbers equal to the maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedMax(5);
            chai_1.expect(rule.test(5)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers less than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedMax(5);
            chai_1.expect(rule.test(4)).to.deep.equal(rule_1.success);
        });
    });
    describe('open max', () => {
        const expectedError = {
            title: 'greater than or equal to maximum',
            description: 'must be less than the open maximum value of 5',
        };
        it('should reject numbers greater than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().openMax(5);
            chai_1.expect(rule.test(6)).to.deep.equal(expectedError);
        });
        it('should reject numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openMax(5);
            chai_1.expect(rule.test(5)).to.deep.equal(expectedError);
        });
        it('should accept numbers less than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().openMax(5);
            chai_1.expect(rule.test(4)).to.deep.equal(rule_1.success);
        });
    });
    describe('closedInterval', () => {
        const expectedError = {
            title: 'outside closed interval',
            description: 'outside of the closed interval of [2,4]',
        };
        it('should reject numbers less than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().closedInterval(2, 4);
            chai_1.expect(rule.test(1)).to.deep.equal(expectedError);
        });
        it('should accept numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().closedInterval(2, 4);
            chai_1.expect(rule.test(2)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers between the minimum and maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedInterval(2, 4);
            chai_1.expect(rule.test(3)).to.deep.equal(rule_1.success);
        });
        it('should accept numbers equal to the maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedInterval(2, 4);
            chai_1.expect(rule.test(4)).to.deep.equal(rule_1.success);
        });
        it('should reject numbers greater than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().closedInterval(2, 4);
            chai_1.expect(rule.test(5)).to.deep.equal(expectedError);
        });
    });
    describe('openInterval', () => {
        const expectedError = {
            title: 'outside open interval',
            description: 'outside of the open interval of (2,4)',
        };
        it('should reject numbers less than the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openInterval(2, 4);
            chai_1.expect(rule.test(1)).to.deep.equal(expectedError);
        });
        it('should reject numbers equal to the minimum', () => {
            const rule = new NumberRule_1.NumberRule().openInterval(2, 4);
            chai_1.expect(rule.test(2)).to.deep.equal(expectedError);
        });
        it('should accept numbers between the minimum and maximum', () => {
            const rule = new NumberRule_1.NumberRule().openInterval(2, 4);
            chai_1.expect(rule.test(3)).to.deep.equal(rule_1.success);
        });
        it('should reject numbers equal to the maximum', () => {
            const rule = new NumberRule_1.NumberRule().openInterval(2, 4);
            chai_1.expect(rule.test(4)).to.deep.equal(expectedError);
        });
        it('should reject numbers greater than the maximum', () => {
            const rule = new NumberRule_1.NumberRule().openInterval(2, 4);
            chai_1.expect(rule.test(5)).to.deep.equal(expectedError);
        });
    });
});
//# sourceMappingURL=NumberRule.spec.js.map