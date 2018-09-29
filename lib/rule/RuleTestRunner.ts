import { RuleTestRunnerOptions } from '../rule/RuleTestRunner';
import {
  DefaultValidationRuleError,
  TestAndOptionalDefaultError,
  ValidationRuleError,
  ValidationRuleResult,
} from '../types/ValidationRule';

export interface RuleTestRunnerOptions {
  failOnEmptyTestList?: boolean;
  defaultErrorJoiner?: string;
  initialTypeTestType?: string;
}

const defaultRuleTestRunnerOptions: RuleTestRunnerOptions = {
  defaultErrorJoiner: ', ',
};

export class RuleTestRunner<T> {
  private readonly opts: RuleTestRunnerOptions;
  private readonly testGroup: Array<TestAndOptionalDefaultError<T>>;

  constructor(opts: RuleTestRunnerOptions = defaultRuleTestRunnerOptions) {
    this.opts = opts;
    this.testGroup = [];
  }

  public addTest(testAndOptionalDefaultError: TestAndOptionalDefaultError<T>): void {
    this.testGroup.push(testAndOptionalDefaultError);
  }

  public addTests(testAndOptionalDefaultErrors: Array<TestAndOptionalDefaultError<T>>): void {
    this.testGroup.push.apply(this.testGroup, testAndOptionalDefaultErrors);
  }

  public run(data: T): ValidationRuleResult {
    if (this.failsInitialTest(data)) {
      return this.getInitialTypeTestError(data);
    } else if (this.testsHaveFailed(data)) {
      return this.getDefaultError(data);
    } else {
      return { success: true };
    }
  }

  private failsInitialTest(data: T): boolean {
    return !!(
      this.opts.initialTypeTestType && typeof data !== this.opts.initialTypeTestType
    );
  }

  private getInitialTypeTestError(data: T): ValidationRuleError {
    return {
      title: `type must be ${this.opts.initialTypeTestType}`,
      description: `must have type '${this.opts.initialTypeTestType}' but was really of type '${typeof data}'`,
    };
  }

  private testsHaveFailed(data: T): boolean {
    return (
      this.getFailedTests(data).length > 0 ||
      (this.opts.failOnEmptyTestList && this.testGroup.length === 0)
    );
  }

  private getFailedTests(data: T): Array<TestAndOptionalDefaultError<T>> {
    return this.testGroup.filter(({ test }) => !test(data));
  }

  private getFailedTestDefaultErrors(data: T): DefaultValidationRuleError[] {
    return this.getFailedTests(data)
      .filter((testGroup) => testGroup.defaultError)
      .map((testGroup) => testGroup.defaultError);
  }

  private getDefaultError(data: T): ValidationRuleError {
    const failedRuleDefaultErrors = this.getFailedTestDefaultErrors(data);
    const title: string = failedRuleDefaultErrors
      .map((defaultError) => defaultError.title)
      .join(this.opts.defaultErrorJoiner);
    const description: string = failedRuleDefaultErrors
      .map((defaultError) => defaultError.description)
      .join(this.opts.defaultErrorJoiner);
    return {
      title,
      description,
    };
  }
}
