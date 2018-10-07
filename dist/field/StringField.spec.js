"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const __1 = require("..");
const StringRule_1 = require("../rule/StringRule");
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
            chai_1.expect(r.rule).to.an.instanceOf(StringRule_1.StringRule);
        });
    });
});
//# sourceMappingURL=StringField.spec.js.map