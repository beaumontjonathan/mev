import { ValidationRuleResult } from '../types/ValidationRule';
import { Rule, RuleOptions } from './Rule';
export interface BooleanRuleOptions extends RuleOptions {
}
export declare const defaultBooleanRuleOptions: BooleanRuleOptions;
export declare class BooleanRule extends Rule<boolean> {
    constructor(opts?: BooleanRuleOptions);
    true(): this;
    false(): this;
    test(b: boolean): ValidationRuleResult;
}
