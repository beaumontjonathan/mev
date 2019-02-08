import { StringRule } from '../rule';
import { Field, FieldOptions } from './Field';
export interface StringFieldOptions extends FieldOptions {
}
export declare const defaultStringFieldOptions: StringFieldOptions;
export declare class StringField extends Field<string, StringRule> {
    constructor(opts?: StringFieldOptions, rules?: StringRule[]);
    clone(): StringField;
}
