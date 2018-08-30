import { Rule } from '../rule/Rule';
import { ValidationFactory } from '../types/ValidationFactory';
import { BooleanField, BooleanFieldOptions, defaultBooleanFieldOptions } from './BooleanField';
import { Field, FieldOptions } from './Field';
import { defaultNumberFieldOptions, NumberField, NumberFieldOptions } from './NumberField';
import { defaultStringFieldOptions, StringField, StringFieldOptions } from './StringField';

export interface FieldFactoryOptions extends FieldOptions {}

export const defaultFieldFactoryOptions: FieldFactoryOptions = {
};

export class FieldFactory<T, R extends Rule<T>> extends Field<T, R> implements ValidationFactory {
  constructor(opts: FieldFactoryOptions = defaultFieldFactoryOptions) {
    super(opts);
  }

  public string(opts?: StringFieldOptions): StringField {
    return new StringField({...this.opts, ...opts, ...defaultStringFieldOptions});
  }

  public number(opts?: NumberFieldOptions): NumberField {
    return new NumberField({...this.opts, ...opts, ...defaultNumberFieldOptions});
  }

  public boolean(opts?: BooleanFieldOptions): BooleanField {
    return new BooleanField({...this.opts, ...opts, ...defaultBooleanFieldOptions});
  }

  public any(opts?: FieldOptions): Field<any, Rule<any>> {
    return new Field<any, Rule<any>>({...this.opts, ...opts});
  }
}

export function createValidationField<T, R extends Rule<T>>(opts?: any): FieldFactory<T, R> {
  return new FieldFactory(opts);
}
