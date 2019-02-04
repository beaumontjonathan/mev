import { expect } from 'chai';
import 'mocha';
import { StringRule } from '../rule/StringRule';
import { Validation, ValidationError } from '../types/Validation';
import { Schema } from './Schema';

describe('Schema', () => {
  describe('addField', () => {
    it('should throw error when duplicate field name is added', () => {
      const fieldName: string = 'fieldName';
      const schema: Schema = new Schema().addField(fieldName, (f) => f);

      expect(() => schema.addField(fieldName, (f) => f)).to.throw(
        Error,
        `Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`);
    });
  });

  describe('addSchemaField', () => {
    it('should accept deep objects as arguments', () => {
      const childSchema: Schema = new Schema()
        .addField('child', (f) => f
          .string()
          .addRule((r) => r.title('title').description('description').maxLength(0)));
      const parentSchema: Schema = new Schema().addSchemaField('parent', childSchema);

      const expectedError: ValidationError = {
        errors: [
          {
            title: 'title',
            description: 'description',
            fieldName: 'child',
            parent: 'parent',
          },
        ],
      };

      const validation: Validation = parentSchema.test({ parent: { child: 'asdf' } });

      expect(validation).to.deep.equal(expectedError);
    });

    it('should accept deeper objects as arguments', () => {
      const schema1: Schema = new Schema()
        .addField('internal', (f) => f
          .string()
          .addRule((r) => r.title('fail').description('fail').maxLength(0)),
        );
      const schema2: Schema = new Schema().addSchemaField('schema1', schema1);
      const schema3: Schema = new Schema().addSchemaField('schema2', schema2);
      const schema4: Schema = new Schema().addSchemaField('schema3', schema3);

      const expectedError: ValidationError = {
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

      expect(schema4.test(data)).to.deep.equal(expectedError);
    });

    it('should accept a function which is passed a new schema', () => {
      const createSchema = () => new Schema()
        .addSchemaField('name', (s) => s);

      expect(createSchema).to.not.throw(Error);
    });
  });

  describe('run', () => {
    it('should return errors for each failing test for each field', () => {
      const schema: Schema = new Schema()
        .addField('asdf', (f) => f
          .string()
          .addRule((r) => r.minLength(3))
          .addRule((r) => r.maxLength(5)),
        );

      const rule: StringRule = new StringRule()
        .maxLength(5);
    });

    it('should not fail empty or missing fields', () => {
      const schema: Schema = new Schema()
        .addField('name', (f) => f
          .string()
          .addRule((r) => r.maxLength(5)),
        );
    });
  });
});
