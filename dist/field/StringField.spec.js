"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const StringRule_1 = require("../rule/StringRule");
const field_1 = require("../test_helpers/field");
const StringField_1 = require("./StringField");
describe('StringField', () => {
    describe('addRule', () => {
        it('will pass', () => {
            const field = new StringField_1.StringField()
                .addRule((r) => r.maxLength(5))
                .addRule((r) => r.blacklist(['will']))
                .addRule((r) => r.upperCase())
                .validate('will fail');
            chai_1.expect(field.errors).to.have.length(3);
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