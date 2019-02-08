import { ValidationRuleResult } from '../types';
import { Rule, RuleOptions } from './Rule';
export interface NumberRuleOptions extends RuleOptions {
}
export declare const defaultNumberRuleOptions: NumberRuleOptions;
export declare class NumberRule extends Rule<number> {
    constructor(opts?: NumberRuleOptions);
    min(min: number): this;
    closedMin(min: number): this;
    openMin(min: number): this;
    max(max: number): this;
    closedMax(max: number): this;
    openMax(max: number): this;
    closedInterval(min: number, max: number): this;
    openInterval(min: number, max: number): this;
    test(n: number): ValidationRuleResult;
}
