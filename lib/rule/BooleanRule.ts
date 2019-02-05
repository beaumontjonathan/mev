import { ValidationRuleResult } from '../types/ValidationRule';
import { defaultRuleOptions, Rule, RuleOptions } from './Rule';

export interface BooleanRuleOptions extends RuleOptions {}

export const defaultBooleanRuleOptions: BooleanRuleOptions = {
  ...defaultRuleOptions,
  initialTypeTestType: 'boolean',
};

export class BooleanRule extends Rule<boolean> {
  constructor(opts: BooleanRuleOptions = defaultBooleanRuleOptions) {
    super(opts);
  }

  public true(): this {
    this.addNonRequiredInternalTestFunction((b) => b, {
      title: 'not true',
      description: 'must be true',
    });
    return this;
  }

  public false(): this {
    this.addNonRequiredInternalTestFunction((b) => !b, {
      title: 'not false',
      description: 'must be false',
    });
    return this;
  }

  public test(b: boolean): ValidationRuleResult {
    return super.test(b);
  }
}
