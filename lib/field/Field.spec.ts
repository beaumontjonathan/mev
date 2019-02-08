import { expect } from 'chai';
import 'mocha';
import { Rule } from '../rule';
import { extractRule } from '../test_helpers/field';
import { emptyData, emptyFail, falsyTest, success, truthyTest } from '../test_helpers/rule';
import { Validation } from '../types';
import { Field } from './Field';

describe('Field', () => {
  describe('addRule', () => {
    it('should return a new rule type', () => {
      const field: Field<any, Rule<any>> = new Field();

      const r: { rule?: any } = {};

      field.addRule(extractRule(r));

      expect(r.rule).to.an.instanceOf(Rule);
    });

    it('should throw an error if a rule added does not extend Rule', () => {
      const r: Rule<any> = {} as Rule<any>;

      const field: Field<any, Rule<any>> = new Field();

      expect(() => field.addRule(r)).to.throw(
        Error,
        'Rule of type Object does not extend the required rule of type Rule',
      );
    });
  });

  describe('test', () => {
    it('should return no errors when all rules pass', () => {
      const field: Field<any, Rule<any>> = new Field()
        .addRule((r) => r.addTestFunction(truthyTest))
        .addRule((r) => r.addTestFunction(truthyTest))
        .addRule((r) => r.addTestFunction(truthyTest));

      expect(field.test(emptyData)).to.deep.equal(success);
    });

    it('should return errors for each failing test', () => {
      const field: Field<any, Rule<any>> = new Field()
        .addRule((r) => r.addTestFunction(truthyTest))
        .addRule((r) => r.addTestFunction(truthyTest))
        .addRule((r) => r.addTestFunction(falsyTest));

      const expectedError: Validation = {
        errors: [{ ...emptyFail }],
      };

      expect(field.test(emptyData)).to.deep.equal(expectedError);

      field.addRule((r) => r.addTestFunction(falsyTest));
      expectedError.errors.push(emptyFail);

      expect(field.test(emptyData)).to.deep.equal(expectedError);
    });
  });
});
