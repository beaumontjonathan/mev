"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const StringRule_1 = require("../rule/StringRule");
const Schema_1 = require("./Schema");
describe('Schema', () => {
    describe('addField', () => {
        it('should throw error when duplicate field name is added', () => {
            const fieldName = 'fieldName';
            const schema = new Schema_1.Schema().addField(fieldName, (f) => f);
            chai_1.expect(() => schema.addField(fieldName, (f) => f)).to.throw(Error, `Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`);
        });
    });
    describe('run', () => {
        it('should return errors for each failing test for each field', () => {
            const schema = new Schema_1.Schema()
                .addField('asdf', (f) => f
                .string()
                .addRule((r) => r.minLength(3))
                .addRule((r) => r.maxLength(5)));
            const rule = new StringRule_1.StringRule()
                .maxLength(5);
        });
    });
});
//# sourceMappingURL=Schema.spec.js.map