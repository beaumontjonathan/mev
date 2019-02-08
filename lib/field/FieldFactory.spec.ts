import { expect } from 'chai';
import 'mocha';
import { Rule } from '../rule';
import { BooleanField } from './BooleanField';
import { Field } from './Field';
import { createValidationField, FieldFactory } from './FieldFactory';
import { NumberField } from './NumberField';
import { StringField } from './StringField';

describe('FieldFactory', () => {
  describe('constructor', () => {
    expect(new FieldFactory()).to.be.an.instanceOf(Field);
  });

  describe('string', () => {
    it('should return a new StringRule', () => {
      expect(new FieldFactory().string()).to.be.an.instanceOf(StringField);
    });
  });

  describe('number', () => {
    it('should return a new NumberRule', () => {
      expect(new FieldFactory().number()).to.be.an.instanceOf(NumberField);
    });
  });

  describe('boolean', () => {
    it('should return a new BooleanRule', () => {
      expect(new FieldFactory().boolean()).to.be.an.instanceOf(BooleanField);
    });
  });

  describe('any', () => {
    it('should return a new generic Rule', () => {
      expect(new FieldFactory().any()).to.be.an.instanceOf(Field);
    });
  });
});

describe('createValidationField', () => {
  it('should return new FieldFactory', () => {
    const fieldFactory: FieldFactory<any, Rule<any>> = createValidationField();

    expect(fieldFactory).to.be.an.instanceOf(FieldFactory);
  });
});
