import { DefaultValidationRuleError, RuleTest, ValidationRuleResult } from '../types/ValidationRule';
import { RuleTestRunner } from './RuleTestRunner';
export interface RuleOptions {
    fieldName?: string;
    initialTypeTestType?: string;
}
export declare const defaultRuleOptions: RuleOptions;
export declare class Rule<T> {
    protected readonly opts: RuleOptions;
    protected readonly testRunner: RuleTestRunner<T>;
    protected internalTitle: string;
    protected internalDescription: string;
    constructor(opts?: RuleOptions);
    title(t: string): this;
    description(d: string): this;
    addTestFunction(test: RuleTest<T>): this;
    test(data: T): ValidationRuleResult;
    protected addInternalTestFunction(test: RuleTest<T>, defaultError?: DefaultValidationRuleError): this;
    private getFieldNameOrEmpty;
    private resultIsError;
}
