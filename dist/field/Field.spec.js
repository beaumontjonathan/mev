"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Rule_1 = require("../rule/Rule");
const field_1 = require("../test_helpers/field");
const rule_1 = require("../test_helpers/rule");
const Field_1 = require("./Field");
describe('Field', () => {
    describe('addRule', () => {
        it('should return a new rule type', () => {
            const field = new Field_1.Field();
            const r = {};
            field.addRule(field_1.extractRule(r));
            chai_1.expect(r.rule).to.an.instanceOf(Rule_1.Rule);
        });
        it('should throw an error if a rule added does not extend Rule', () => {
            const r = {};
            const field = new Field_1.Field();
            chai_1.expect(() => field.addRule(r)).to.throw(Error, 'Rule of type Object does not extend the required rule of type Rule');
        });
    });
    describe('validate', () => {
        it('should return no errors when all rules pass', () => {
            const field = new Field_1.Field()
                .addRule((r) => r.addTestFunction(rule_1.truthyTest))
                .addRule((r) => r.addTestFunction(rule_1.truthyTest))
                .addRule((r) => r.addTestFunction(rule_1.truthyTest));
            chai_1.expect(field.validate(rule_1.emptyData)).to.deep.equal(rule_1.success);
        });
        it('should return errors for each failing test', () => {
            const field = new Field_1.Field()
                .addRule((r) => r.addTestFunction(rule_1.truthyTest))
                .addRule((r) => r.addTestFunction(rule_1.truthyTest))
                .addRule((r) => r.addTestFunction(rule_1.falsyTest));
            const expectedError = {
                success: false,
                errors: [rule_1.emptyFail],
            };
            chai_1.expect(field.validate(rule_1.emptyData)).to.deep.equal(expectedError);
            field.addRule((r) => r.addTestFunction(rule_1.falsyTest));
            expectedError.errors.push(rule_1.emptyFail);
            chai_1.expect(field.validate(rule_1.emptyData)).to.deep.equal(expectedError);
        });
    });
});
//# sourceMappingURL=Field.spec.js.map