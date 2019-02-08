"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const __1 = require("..");
const rule_1 = require("../rule");
const field_1 = require("../test_helpers/field");
const utils_1 = require("../utils");
const StringField_1 = require("./StringField");
describe('StringField', () => {
    describe('addRule', () => {
        it('will pass', () => {
            const testString = 'will fail';
            const rule = __1.createValidationRule().string().maxLength(5);
            const rule2 = __1.createValidationRule().string().blacklist(['will']);
            const rule3 = __1.createValidationRule().string().upperCase();
            const field = new StringField_1.StringField()
                .addRule(rule)
                .addRule(rule2)
                .addRule(rule3);
            const validation = field.test(testString);
            chai_1.expect(utils_1.isError(validation)).to.be;
            // @ts-ignore
            chai_1.expect(validation.errors).to.be.an.instanceof(Array);
            // @ts-ignore
            chai_1.expect(validation.errors).to.have.lengthOf(3);
        });
        it('should return a new string rule type', () => {
            const field = new StringField_1.StringField();
            const r = {};
            // @ts-ignore
            field.addRule(field_1.extractRule(r));
            chai_1.expect(r.rule).to.an.instanceOf(rule_1.StringRule);
        });
        it('should not fail if undefined', () => {
            const emptyValue = undefined;
            const field = new StringField_1.StringField()
                .addRule((r) => r.maxLength(10));
            const validation = field.test(emptyValue);
            chai_1.expect(__1.isSuccess(validation)).to.be.true;
        });
    });
    describe('clone', () => {
        it('should not affect cloned fields', () => {
            const emptyValue = undefined;
            const field = new StringField_1.StringField()
                .addRule((r) => r.maxLength(10));
            const clone = field.clone().addRule((r) => r.required());
            const originalValidation = field.test(emptyValue);
            const clonedValidation = clone.test(emptyValue);
            chai_1.expect(__1.isSuccess(originalValidation)).to.be.true;
            chai_1.expect(__1.isSuccess(clonedValidation)).to.be.false;
        });
    });
});
//# sourceMappingURL=StringField.spec.js.map