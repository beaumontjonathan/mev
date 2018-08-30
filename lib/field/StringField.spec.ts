import { expect } from 'chai';
import 'mocha';
import { StringRule } from '../rule/StringRule';
import { extractRule } from '../test_helpers/field';
import { StringField } from './StringField';

describe('StringField', () => {
  describe('addRule', () => {
    it('will pass', () => {
      const field: any = new StringField()
        .addRule((r) => r.maxLength(5))
        .addRule((r) => r.blacklist(['will']))
        .addRule((r) => r.upperCase())
        .validate('will fail');

      expect(field.errors).to.have.length(3);
    });

    it('should return a new string rule type', () => {
      const field: StringField = new StringField();

      const r: {rule?: any} = {};

      // @ts-ignore
      field.addRule(extractRule(r));
      expect(r.rule).to.an.instanceOf(StringRule);
    });
  });
});
