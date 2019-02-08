import { RuleTestRunnerOptions } from '../rule/RuleTestRunner';
import { TestAndOptionalDefaultError, ValidationRuleResult } from '../types';
export interface RuleTestRunnerOptions {
    failOnEmptyTestList?: boolean;
    defaultErrorJoiner?: string;
    initialTypeTestType?: string;
}
export declare class RuleTestRunner<T> {
    private readonly opts;
    private readonly testGroup;
    constructor(opts?: RuleTestRunnerOptions);
    addTest(testAndOptionalDefaultError: TestAndOptionalDefaultError<T>): void;
    addTests(testAndOptionalDefaultErrors: Array<TestAndOptionalDefaultError<T>>): void;
    run(data: T): ValidationRuleResult;
    private failsInitialTest;
    private getInitialTypeTestError;
    private testsHaveFailed;
    private getFailedTests;
    private getFailedTestDefaultErrors;
    private getDefaultError;
}
