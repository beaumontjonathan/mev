import { ValidationRuleError, ValidationRuleSuccess } from '../types/ValidationRule';

export const emptyFail: ValidationRuleError = {
  title: '',
  description: '',
};

export const success: ValidationRuleSuccess = {
  success: true,
};

export const emptyData: any = null;

export const truthyTest = () => true;
export const falsyTest = () => false;
