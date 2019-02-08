import {
  DefaultValidationRuleError,
  RuleTest,
  ValidationRuleError,
  ValidationRuleResult, ValidationRuleSuccess,
} from '../types';
import { RuleTestRunner, RuleTestRunnerOptions } from './RuleTestRunner';

export interface RuleOptions {
  fieldName?: string;
  useFieldName?: boolean;
  initialTypeTestType?: string;
}

export const defaultRuleOptions: RuleOptions = {};

export class Rule<T> {
  protected static valueIsEmpty(value: any): boolean {
    return value === undefined || value === null;
  }

  protected readonly opts: RuleOptions;
  protected readonly testRunner: RuleTestRunner<T>;
  protected internalTitle: string;
  protected internalDescription: string;

  constructor(opts: RuleOptions = defaultRuleOptions) {
    this.opts = { ...defaultRuleOptions, ...opts };
    this.testRunner = new RuleTestRunner<T>({ ...opts } as RuleTestRunnerOptions);
  }

  public title(t: string): this {
    this.internalTitle = t;
    return this;
  }

  public description(d: string): this {
    this.internalDescription = d;
    return this;
  }

  public required(): this {
    this.addInternalTestFunction((data: any) => !Rule.valueIsEmpty(data), {
      title: 'required',
      description: `is required to have a value`,
    });
    return this;
  }

  public addTestFunction(test: RuleTest<T>): this {
    this.testRunner.addTest({ test });
    return this;
  }

  public addNonRequiredTestFunction(test: RuleTest<T>): this {
    const combinedTest = (data: any) => Rule.valueIsEmpty(data) || test(data);
    this.addTestFunction(combinedTest);
    return this;
  }
  public test(data: T): ValidationRuleResult {
    const validationRuleResult: ValidationRuleResult = this.testRunner.run(data);
    const fieldName = this.getFieldNameOrEmpty();
    const init = this.opts.useFieldName ? fieldName : '';
    if (this.resultIsError(validationRuleResult)) {
      return {
        title: init + (this.internalTitle || validationRuleResult.title),
        description: init + (this.internalDescription || validationRuleResult.description),
      };
    } else {
      return { success: true };
    }
  }

  protected addInternalTestFunction(test: RuleTest<T>, defaultError?: DefaultValidationRuleError): this {
    this.testRunner.addTest({ test, defaultError });
    return this;
  }

  protected addNonRequiredInternalTestFunction(test: RuleTest<T>, defaultError?: DefaultValidationRuleError): this {
    const combinedTest = (data: any) => Rule.valueIsEmpty(data) || test(data);
    this.addInternalTestFunction(combinedTest, defaultError);
    return this;
  }

  private getFieldNameOrEmpty(): string {
    return (this.opts.fieldName) ? `${this.opts.fieldName} ` : '';
  }

  private resultIsError(r: ValidationRuleResult): r is ValidationRuleError {
    return !(r as ValidationRuleSuccess).success;
  }
}
