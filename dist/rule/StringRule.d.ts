import { ValidationRuleResult } from '../types';
import { Rule, RuleOptions } from './Rule';
export interface StringRuleOptions extends RuleOptions {
}
export declare const defaultStringRuleOptions: StringRuleOptions;
export declare class StringRule extends Rule<string> {
    constructor(opts?: StringRuleOptions);
    minLength(min: number): this;
    maxLength(max: number): this;
    blacklist(list: string[]): this;
    upperCase(): this;
    lowerCase(): this;
    alphanumeric(): this;
    regex(regex: RegExp): this;
    test(str: string): ValidationRuleResult;
}
