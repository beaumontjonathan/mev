"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const NumberRule_1 = require("../rule/NumberRule");
const field_1 = require("../test_helpers/field");
const NumberField_1 = require("./NumberField");
describe('NumberField', () => {
    describe('addRule', () => {
        it('should return a new boolean rule type', () => {
            const field = new NumberField_1.NumberField();
            const r = {};
            // @ts-ignore
            field.addRule(field_1.extractRule(r));
            chai_1.expect(r.rule).to.an.instanceOf(NumberRule_1.NumberRule);
        });
    });
});
//# sourceMappingURL=NumberField.spec.js.map