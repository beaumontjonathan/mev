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
    describe('addSchemaField', () => {
        it('should accept deep objects as arguments', () => {
            const childSchema = new Schema_1.Schema()
                .addField('child', (f) => f
                .string()
                .addRule((r) => r.title('title').description('description').maxLength(0)));
            const parentSchema = new Schema_1.Schema().addSchemaField('parent', childSchema);
            const expectedError = {
                errors: [
                    {
                        title: 'title',
                        description: 'description',
                        fieldName: 'child',
                        parent: 'parent',
                    },
                ],
            };
            const validation = parentSchema.test({ parent: { child: 'asdf' } });
            chai_1.expect(validation).to.deep.equal(expectedError);
        });
        it('should accept deeper objects as arguments', () => {
            const schema1 = new Schema_1.Schema()
                .addField('internal', (f) => f
                .string()
                .addRule((r) => r.title('fail').description('fail').maxLength(0)));
            const schema2 = new Schema_1.Schema().addSchemaField('schema1', schema1);
            const schema3 = new Schema_1.Schema().addSchemaField('schema2', schema2);
            const schema4 = new Schema_1.Schema().addSchemaField('schema3', schema3);
            const expectedError = {
                errors: [
                    {
                        title: 'fail',
                        description: 'fail',
                        fieldName: 'internal',
                        parent: 'schema1',
                    },
                ],
            };
            const data = {
                schema3: {
                    schema2: {
                        schema1: {
                            internal: 'asdf',
                        },
                    },
                },
            };
            chai_1.expect(schema4.test(data)).to.deep.equal(expectedError);
        });
        it('should accept a function which is passed a new schema', () => {
            const createSchema = () => new Schema_1.Schema()
                .addSchemaField('name', (s) => s);
            chai_1.expect(createSchema).to.not.throw(Error);
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
        it('should not fail empty or missing fields', () => {
            const schema = new Schema_1.Schema()
                .addField('name', (f) => f
                .string()
                .addRule((r) => r.maxLength(5)));
            schema.test({});
        });
    });
});
//# sourceMappingURL=Schema.spec.js.map