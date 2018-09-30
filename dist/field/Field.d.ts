import { Rule } from '../rule/Rule';
import { Validation } from '../types/Validation';
export interface FieldOptions {
    rule?: Rule<any>;
    fieldName?: string;
    useFieldName?: boolean;
}
export declare const defaultFieldOptions: FieldOptions;
export declare class Field<T, R extends Rule<T>> {
    protected opts: FieldOptions;
    protected rules: R[];
    constructor(opts?: FieldOptions);
    addRule(r: R): this;
    addRule(fn: (r: R) => R): this;
    validate(d: T): Validation;
    protected getNewRule(): R;
}
