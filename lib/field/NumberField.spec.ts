import { expect } from 'chai';
import { NumberRule } from '../rule/NumberRule';
import { extractRule } from '../test_helpers/field';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  describe('addRule', () => {
    it('should return a new boolean rule type', () => {
      const field: NumberField = new NumberField();

      const r: {rule?: any} = {};

      // @ts-ignore
      field.addRule(extractRule(r));
      expect(r.rule).to.an.instanceOf(NumberRule);
    });
  });
});
