import { Rule } from '../rule';
import { ValidationFactory } from '../types/ValidationFactory';
import { BooleanField, BooleanFieldOptions } from './BooleanField';
import { Field, FieldOptions } from './Field';
import { NumberField, NumberFieldOptions } from './NumberField';
import { StringField, StringFieldOptions } from './StringField';
export interface FieldFactoryOptions extends FieldOptions {
}
export declare const defaultFieldFactoryOptions: FieldFactoryOptions;
export declare class FieldFactory<T, R extends Rule<T>> extends Field<T, R> implements ValidationFactory {
    constructor(opts?: FieldFactoryOptions);
    string(opts?: StringFieldOptions): StringField;
    number(opts?: NumberFieldOptions): NumberField;
    boolean(opts?: BooleanFieldOptions): BooleanField;
    any(opts?: FieldOptions): Field<any, Rule<any>>;
}
export declare function createValidationField<T, R extends Rule<T>>(opts?: any): FieldFactory<T, R>;
