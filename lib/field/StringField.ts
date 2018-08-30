import { StringRule } from '../rule/StringRule';
import { defaultFieldOptions, Field, FieldOptions } from './Field';

export interface StringFieldOptions extends FieldOptions {
}

export const defaultStringFieldOptions: StringFieldOptions = {
  ...defaultFieldOptions,
  rule: new StringRule(),
};

export class StringField extends Field<string, StringRule> {
  constructor(opts: StringFieldOptions = defaultStringFieldOptions) {
    super(opts);
  }
}
