import { Field } from '../field/Field';
import { FieldFactory } from '../field/FieldFactory';
import { Rule } from '../rule/Rule';

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

  public run(obj: any) {
    const errors = Array
      .from(this.fields)
      .map(([fieldName, field]) => ({ fieldName, result: field.validate(obj[fieldName]) }))
      .filter(({ result }) => !result.success)
      .map(({ fieldName, result }) =>
        result.errors.map(({ title, description }) => ({
          title,
          description,
          fieldName,
        })),
      )
      .reduce((t, e) => t.concat(e), []);
    if (errors.length === 0) {
      return { success: true };
    } else {
      return { success: false, errors };
    }
  }
}

export function createValidationSchema(opts?: SchemaOptions): Schema {
  return new Schema(opts);
}
