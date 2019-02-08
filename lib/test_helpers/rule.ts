import { createValidationField, createValidationRule } from '..';
import { ValidationRuleError, ValidationRuleSuccess } from '../types';

export const emptyFail: ValidationRuleError = {
  title: '',
  description: '',
};

export const success: ValidationRuleSuccess = {
  success: true,
};

export const emptyData: any = null;

export const truthyTest = (o: any) => true;
export const falsyTest = (o: any) => false;

export const truthyRule = createValidationRule().any().addTestFunction(truthyTest);
export const falsyRule = createValidationRule().any().addTestFunction(falsyTest);
