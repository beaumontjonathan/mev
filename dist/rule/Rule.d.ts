import { DefaultValidationRuleError, RuleTest, ValidationRuleResult } from '../types/ValidationRule';
import { RuleTestRunner } from './RuleTestRunner';
export interface RuleOptions {
    fieldName?: string;
    useFieldName?: boolean;
    initialTypeTestType?: string;
}
export declare const defaultRuleOptions: RuleOptions;
export declare class Rule<T> {
    protected static valueIsEmpty(value: any): boolean;
    protected readonly opts: RuleOptions;
    protected readonly testRunner: RuleTestRunner<T>;
    protected internalTitle: string;
    protected internalDescription: string;
    constructor(opts?: RuleOptions);
    title(t: string): this;
    description(d: string): this;
    required(): this;
    addTestFunction(test: RuleTest<T>): this;
    addNonRequiredTestFunction(test: RuleTest<T>): this;
    test(data: T): ValidationRuleResult;
    protected addInternalTestFunction(test: RuleTest<T>, defaultError?: DefaultValidationRuleError): this;
    protected addNonRequiredInternalTestFunction(test: RuleTest<T>, defaultError?: DefaultValidationRuleError): this;
    private getFieldNameOrEmpty;
    private resultIsError;
}
