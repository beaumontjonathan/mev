import { Field } from '../field/Field';
import { FieldFactory } from '../field/FieldFactory';
import { Rule } from '../rule/Rule';
import { Validation, ValidationError } from '../types/Validation';
import { ValidationRuleError } from '../types/ValidationRule';
import { isError } from '../utils';

export interface SchemaOptions {
}

export const defaultSchemaOptions: SchemaOptions = {};

export class Schema {
  protected opts: SchemaOptions;
  protected fields: Map<string, Schema | Field<any, Rule<any>>>;

  constructor(opts: SchemaOptions = defaultSchemaOptions) {
    this.opts = opts;
    this.fields = new Map();
  }

  public addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: (ff: FieldFactory<T, Rule<T>>) => F): this;
  public addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: F): this;
  public addField<T, F extends Field<T, Rule<T>>>(
    fieldName: string, field: F | ((ff: FieldFactory<T, Rule<T>>) => F),
  ): this {
    this.ensureFieldNameIsUnique(fieldName);
    if (typeof field === 'function') {
      return this.addField(fieldName, field(new FieldFactory({ ...this.opts, fieldName })));
    } else {
      this.fields.set(fieldName, field);
      return this;
    }
  }

  public addSchemaField(fieldName: string, schema: Schema): this;
  public addSchemaField(fieldName: string, schema: (sf: Schema) => Schema): this;
  public addSchemaField(fieldName: string, schema: Schema | ((sf: Schema) => Schema)): this {
    this.ensureFieldNameIsUnique(fieldName);
    if (typeof schema === 'function') {
      return this.addSchemaField(fieldName, schema(new Schema()));
    } else {
      this.fields.set(fieldName, schema);
      return this;
    }
  }

  public test(obj: any): Validation {
    function objHasResultPropAsFailure(o: { fieldName: string, testResult: Validation }):
      o is { fieldName: string, testResult: ValidationError } {
      return isError(o.testResult);
    }

    function testFieldOrSchema(field: Schema | Field<any, Rule<any>>, data: any): Validation {
      if (isSchema(field)) {
        return field.test(data);
      } else {
        return field.test(data);
      }
    }

    const fieldAndResultToIncludeFieldNameAndOptionallyParent:
      (a: { fieldName: string, testResult: ValidationError }) => ValidationRuleError[] =
      (asdf) => {
        const { fieldName, testResult } = asdf;
        if (isSchema(this.fields.get(fieldName))) {
          return testResult.errors.map((error: ValidationRuleError) => ({
            parent: fieldName,
            ...error,
          }));
        } else {
          return testResult.errors.map((error: ValidationRuleError) => ({
            fieldName,
            ...error,
          }));
        }
      };

    const errors = Array
      .from(this.fields)
      .map(([fieldName, field]) => ({ fieldName, testResult: testFieldOrSchema(field, obj[fieldName]) }))
      .filter(objHasResultPropAsFailure)
      .map(fieldAndResultToIncludeFieldNameAndOptionallyParent)
      .reduce((t, e) => t.concat(e), []);

    return errors.length === 0 ? { success: true } : { errors };
  }

  private ensureFieldNameIsUnique(fieldName: string) {
    if (this.fields.has(fieldName)) {
      throw new Error(
        `Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`,
      );
    }
  }
}

export function isSchema(s: Schema | Field<any, Rule<any>>): s is Schema {
  return s instanceof Schema;
}

export function createValidationSchema(opts?: SchemaOptions): Schema {
  return new Schema(opts);
}
