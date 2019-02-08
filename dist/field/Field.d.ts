import { Rule } from '../rule';
import { Validation } from '../types';
export interface FieldOptions {
    rule?: Rule<any>;
    fieldName?: string;
    useFieldName?: boolean;
}
export declare const defaultFieldOptions: FieldOptions;
export declare class Field<T, R extends Rule<T>> {
    protected opts: FieldOptions;
    protected rules: R[];
    constructor(opts?: FieldOptions, rules?: R[]);
    addRule(r: R): this;
    addRule(fn: (r: R) => R): this;
    test(d: T): Validation;
    clone(): Field<T, R>;
    protected getNewRule(): R;
}
