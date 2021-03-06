import { BooleanRule } from '../rule';
import { Field, FieldOptions } from './Field';
export interface BooleanFieldOptions extends FieldOptions {
}
export declare const defaultBooleanFieldOptions: BooleanFieldOptions;
export declare class BooleanField extends Field<boolean, BooleanRule> {
    constructor(opts?: BooleanFieldOptions, rules?: BooleanRule[]);
    clone(): BooleanField;
}
