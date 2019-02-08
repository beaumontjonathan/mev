"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const rule_1 = require("../rule");
const field_1 = require("../test_helpers/field");
const rule_2 = require("../test_helpers/rule");
const Field_1 = require("./Field");
describe('Field', () => {
    describe('addRule', () => {
        it('should return a new rule type', () => {
            const field = new Field_1.Field();
            const r = {};
            field.addRule(field_1.extractRule(r));
            chai_1.expect(r.rule).to.an.instanceOf(rule_1.Rule);
        });
        it('should throw an error if a rule added does not extend Rule', () => {
            const r = {};
            const field = new Field_1.Field();
            chai_1.expect(() => field.addRule(r)).to.throw(Error, 'Rule of type Object does not extend the required rule of type Rule');
        });
    });
    describe('test', () => {
        it('should return no errors when all rules pass', () => {
            const field = new Field_1.Field()
                .addRule((r) => r.addTestFunction(rule_2.truthyTest))
                .addRule((r) => r.addTestFunction(rule_2.truthyTest))
                .addRule((r) => r.addTestFunction(rule_2.truthyTest));
            chai_1.expect(field.test(rule_2.emptyData)).to.deep.equal(rule_2.success);
        });
        it('should return errors for each failing test', () => {
            const field = new Field_1.Field()
                .addRule((r) => r.addTestFunction(rule_2.truthyTest))
                .addRule((r) => r.addTestFunction(rule_2.truthyTest))
                .addRule((r) => r.addTestFunction(rule_2.falsyTest));
            const expectedError = {
                errors: [Object.assign({}, rule_2.emptyFail)],
            };
            chai_1.expect(field.test(rule_2.emptyData)).to.deep.equal(expectedError);
            field.addRule((r) => r.addTestFunction(rule_2.falsyTest));
            expectedError.errors.push(rule_2.emptyFail);
            chai_1.expect(field.test(rule_2.emptyData)).to.deep.equal(expectedError);
        });
    });
});
//# sourceMappingURL=Field.spec.js.map