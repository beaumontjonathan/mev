import { NumberRule, StringRule } from '../rule';
import { defaultFieldOptions, Field, FieldOptions } from './Field';

export interface StringFieldOptions extends FieldOptions {
}

export const defaultStringFieldOptions: StringFieldOptions = {
  ...defaultFieldOptions,
  rule: new StringRule(),
};

export class StringField extends Field<string, StringRule> {
  constructor(opts: StringFieldOptions = defaultStringFieldOptions, rules: StringRule[] = []) {
    super(opts, rules);
  }

  public clone(): StringField {
    return new StringField(this.opts, [...this.rules]);
  }
}
