import { ValidationFactory } from '../types/ValidationFactory';
import { BooleanRule } from './BooleanRule';
import { NumberRule } from './NumberRule';
import { Rule } from './Rule';
import { StringRule } from './StringRule';
export declare class RuleFactory<T> extends Rule<T> implements ValidationFactory {
    string(): StringRule;
    number(): NumberRule;
    boolean(): BooleanRule;
    any(): Rule<any>;
}
export declare function createValidationRule<T>(opts?: any): RuleFactory<T>;
