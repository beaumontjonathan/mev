"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const rule_1 = require("../rule");
const rule_2 = require("../rule");
const field_1 = require("../test_helpers/field");
const BooleanField_1 = require("./BooleanField");
describe('BooleanField', () => {
    describe('addRule', () => {
        it('should return a new boolean rule type', () => {
            const field = new BooleanField_1.BooleanField();
            const r = {};
            // @ts-ignore
            field.addRule(field_1.extractRule(r));
            chai_1.expect(r.rule).to.an.instanceOf(rule_1.BooleanRule);
        });
        describe('rejection of non-boolean subclasses of Rule', () => {
            it('should throw an error when a string rule is passed', () => {
                const rule = new rule_2.StringRule().maxLength(4);
                const field = new BooleanField_1.BooleanField();
                // @ts-ignore
                chai_1.expect(() => field.addRule(rule)).to.throw(Error, 'Rule of type StringRule does not extend the required rule of type BooleanRule.');
            });
        });
    });
});
//# sourceMappingURL=BooleanField.spec.js.map