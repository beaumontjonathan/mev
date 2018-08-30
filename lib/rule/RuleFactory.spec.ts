import { expect } from 'chai';
import 'mocha';
import { BooleanRule } from './BooleanRule';
import { NumberRule } from './NumberRule';
import { Rule } from './Rule';
import { createValidationRule, RuleFactory } from './RuleFactory';
import { StringRule } from './StringRule';

describe('RuleFactory', () => {
  describe('constructor', () => {
    expect(new RuleFactory()).to.be.an.instanceOf(Rule);
  });

  describe('string', () => {
    it('should return a new StringRule', () => {
      expect(new RuleFactory().string()).to.be.an.instanceOf(StringRule);
    });
  });

  describe('number', () => {
    it('should return a new NumberRule', () => {
      expect(new RuleFactory().number()).to.be.an.instanceOf(NumberRule);
    });
  });

  describe('boolean', () => {
    it('should return a new BooleanRule', () => {
      expect(new RuleFactory().boolean()).to.be.an.instanceOf(BooleanRule);
    });
  });

  describe('any', () => {
    it('should return a new generic Rule', () => {
      expect(new RuleFactory().any()).to.be.an.instanceOf(Rule);
    });
  });
});

describe('createValidationRule', () => {
  it('should return new RuleFactory', () => {
    const ruleFactory: RuleFactory<any> = createValidationRule();

    expect(ruleFactory).to.be.an.instanceOf(RuleFactory);
  });
});
