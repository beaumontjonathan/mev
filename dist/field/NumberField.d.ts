import { NumberRule } from '../rule';
import { Field, FieldOptions } from './Field';
export interface NumberFieldOptions extends FieldOptions {
}
export declare const defaultNumberFieldOptions: NumberFieldOptions;
export declare class NumberField extends Field<number, NumberRule> {
    constructor(opts?: NumberFieldOptions);
}
