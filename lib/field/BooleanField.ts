import { BooleanRule } from '../rule';
import { defaultFieldOptions, Field, FieldOptions } from './Field';

export interface BooleanFieldOptions extends FieldOptions {
}

export const defaultBooleanFieldOptions: BooleanFieldOptions = {
  ...defaultFieldOptions,
  rule: new BooleanRule(),
};

export class BooleanField extends Field<boolean, BooleanRule> {
  constructor(opts: BooleanFieldOptions = defaultBooleanFieldOptions) {
    super(opts);
  }
}
