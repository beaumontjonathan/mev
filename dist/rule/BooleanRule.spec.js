"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../test_helpers/rule");
const BooleanRule_1 = require("./BooleanRule");
describe('BooleanRule', () => {
    describe('true', () => {
        it('should succeed if the input is true', () => {
            const rule = new BooleanRule_1.BooleanRule().true();
            chai_1.expect(rule.test(true)).to.deep.equal(rule_1.success);
        });
        it('should fail if the input is false', () => {
            const rule = new BooleanRule_1.BooleanRule().true();
            const expectedError = {
                title: 'not true',
                description: 'must be true',
            };
            chai_1.expect(rule.test(false)).to.deep.equal(expectedError);
        });
    });
    describe('false', () => {
        it('should succeed if the input is false', () => {
            const rule = new BooleanRule_1.BooleanRule().false();
            chai_1.expect(rule.test(false)).to.deep.equal(rule_1.success);
        });
        it('should fail if the input is true', () => {
            const rule = new BooleanRule_1.BooleanRule().false();
            const expectedError = {
                title: 'not false',
                description: 'must be false',
            };
            chai_1.expect(rule.test(true)).to.deep.equal(expectedError);
        });
    });
});
//# sourceMappingURL=BooleanRule.spec.js.map