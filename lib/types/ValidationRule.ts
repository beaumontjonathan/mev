export type ValidationRuleResult = ValidationRuleError | ValidationRuleSuccess;

export interface ValidationRuleError extends DefaultValidationRuleError {
  fieldName?: string;
  parent?: string;
}

export interface DefaultValidationRuleError {
  title: string;
  description: string;
}

export interface ValidationRuleSuccess {
  success: true;
}

export type RuleTest<T> = (d: T) => boolean;

export interface TestAndOptionalDefaultError<T> {
  test: RuleTest<T>;
  defaultError?: DefaultValidationRuleError;
}
