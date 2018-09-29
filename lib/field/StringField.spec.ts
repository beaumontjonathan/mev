import { expect } from 'chai';
import 'mocha';
import { createValidationRule } from '..';
import { StringRule } from '../rule/StringRule';
import { extractRule } from '../test_helpers/field';
import { Validation, ValidationError } from '../types/Validation';
import { isError } from '../utils';
import { StringField } from './StringField';

describe('StringField', () => {
  describe('addRule', () => {
    it('will pass', () => {
      const testString: string = 'will fail';
      const rule: StringRule = createValidationRule().string().maxLength(5);
      const rule2: StringRule = createValidationRule().string().blacklist(['will']);
      const rule3: StringRule = createValidationRule().string().upperCase();
      const field: StringField = new StringField()
        .addRule(rule)
        .addRule(rule2)
        .addRule(rule3);

      const validation: ValidationError = field.validate(testString) as ValidationError;
      expect(isError(validation)).to.be;
      // @ts-ignore
      expect(validation.errors).to.be.an.instanceof(Array);
      // @ts-ignore
      expect(validation.errors).to.have.lengthOf(3);
    });

    it('should return a new string rule type', () => {
      const field: StringField = new StringField();

      const r: { rule?: any } = {};

      // @ts-ignore
      field.addRule(extractRule(r));
      expect(r.rule).to.an.instanceOf(StringRule);
    });
  });
});
