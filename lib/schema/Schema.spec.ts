import { expect } from 'chai';
import 'mocha';
import { StringRule } from '../rule/StringRule';
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
  });
});
