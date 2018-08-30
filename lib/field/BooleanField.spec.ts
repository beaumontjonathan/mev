import { expect } from 'chai';
import { BooleanRule } from '../rule/BooleanRule';
import { StringRule } from '../rule/StringRule';
import { extractRule } from '../test_helpers/field';
import { BooleanField } from './BooleanField';

describe('BooleanField', () => {
  describe('addRule', () => {
    it('should return a new boolean rule type', () => {
      const field: BooleanField = new BooleanField();

      const r: { rule?: any } = {};

      // @ts-ignore
      field.addRule(extractRule(r));
      expect(r.rule).to.an.instanceOf(BooleanRule);
    });

    describe('rejection of non-boolean subclasses of Rule', () => {
      it('should throw an error when a string rule is passed', () => {
        const rule: StringRule = new StringRule().maxLength(4);

        const field: BooleanField = new BooleanField();

        // @ts-ignore
        expect(() => field.addRule(rule)).to.throw(
          Error,
          'Rule of type StringRule does not extend the required rule of type BooleanRule.');
      });
    });
  });
});
