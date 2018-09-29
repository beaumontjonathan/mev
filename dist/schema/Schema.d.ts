import { Field } from '../field/Field';
import { FieldFactory } from '../field/FieldFactory';
import { Rule } from '../rule/Rule';
import { Validation } from '../types/Validation';
export interface SchemaOptions {
}
export declare const defaultSchemaOptions: SchemaOptions;
export declare class Schema {
    protected opts: SchemaOptions;
    protected fields: Map<string, Field<any, Rule<any>>>;
    constructor(opts?: SchemaOptions);
    addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: (ff: FieldFactory<T, Rule<T>>) => F): this;
    addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: F): this;
    run(obj: any): Validation;
}
export declare function createValidationSchema(opts?: SchemaOptions): Schema;
