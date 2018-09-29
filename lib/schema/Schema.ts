import { Field } from '../field/Field';
import { FieldFactory } from '../field/FieldFactory';
import { Rule } from '../rule/Rule';
import { Validation, ValidationError, ValidationSuccess } from '../types/Validation';
import { ValidationRuleError } from '../types/ValidationRule';
import { isError, isSuccess } from '../utils';

export interface SchemaOptions {
}

export const defaultSchemaOptions: SchemaOptions = {};

export class Schema {
  protected opts: SchemaOptions;
  protected fields: Map<string, Field<any, Rule<any>>>;

  constructor(opts: SchemaOptions = defaultSchemaOptions) {
    this.opts = opts;
    this.fields = new Map();
  }

  public addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: (ff: FieldFactory<T, Rule<T>>) => F): this;
  public addField<T, F extends Field<T, Rule<T>>>(fieldName: string, field: F): this;
  public addField<T, F extends Field<T, Rule<T>>>(
    fieldName: string, field: F | ((ff: FieldFactory<T, Rule<T>>) => F),
  ): this {
    if (typeof field === 'function') {
      return this.addField(fieldName, field(new FieldFactory({ ...this.opts, fieldName })));
    } else {
      if (this.fields.has(fieldName)) {
        throw new Error(
          `Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`,
        );
      }
      this.fields.set(fieldName, field);
      return this;
    }
  }

  public run(obj: any): Validation {
    function objHasResultPropAsFailure(o: { fieldName: string, testResult: Validation }):
      o is { fieldName: string, testResult: ValidationError } {
      return isError(o.testResult);
    }

    const errors = Array
      .from(this.fields)
      .map(([fieldName, field]) => ({ fieldName, testResult: field.validate(obj[fieldName]) }))
      // .filter(({ result }) => !isSuccess(result))
      .filter(objHasResultPropAsFailure)
      .map(({ fieldName, testResult }) =>
        testResult.errors.map(({ title, description }) => ({
          title,
          description,
          fieldName,
        })),
      )
      .reduce((t, e) => t.concat(e), []);

    return errors.length === 0 ? { success: true } : { errors };
  }
}

export function createValidationSchema(opts?: SchemaOptions): Schema {
  return new Schema(opts);
}
