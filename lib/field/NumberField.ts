import { NumberRule } from '../rule/NumberRule';
import { defaultFieldOptions, Field, FieldOptions } from './Field';

export interface NumberFieldOptions extends FieldOptions {
}

export const defaultNumberFieldOptions: NumberFieldOptions = {
  ...defaultFieldOptions,
  rule: new NumberRule(),
};

export class NumberField extends Field<number, NumberRule> {
  constructor(opts: NumberFieldOptions = defaultNumberFieldOptions) {
    super(opts);
  }
}
