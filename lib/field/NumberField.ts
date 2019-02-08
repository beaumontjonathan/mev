import { NumberRule } from '../rule';
import { defaultFieldOptions, Field, FieldOptions } from './Field';

export interface NumberFieldOptions extends FieldOptions {
}

export const defaultNumberFieldOptions: NumberFieldOptions = {
  ...defaultFieldOptions,
  rule: new NumberRule(),
};

export class NumberField extends Field<number, NumberRule> {
  constructor(opts: NumberFieldOptions = defaultNumberFieldOptions, rules: NumberRule[] = []) {
    super(opts, rules);
  }

  public clone(): NumberField {
    return new NumberField(this.opts, [...this.rules]);
  }
}
