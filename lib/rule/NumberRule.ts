import { ValidationRuleResult } from '../types';
import { defaultRuleOptions, Rule, RuleOptions } from './Rule';

export interface NumberRuleOptions extends RuleOptions {}

export const defaultNumberRuleOptions: NumberRuleOptions = {
  ...defaultRuleOptions,
  initialTypeTestType: 'number',
};

export class NumberRule extends Rule<number> {
  constructor(opts: NumberRuleOptions = defaultNumberRuleOptions) {
    super(opts);
  }

  public min(min: number): this {
    this.addNonRequiredInternalTestFunction((n) => n >= min, {
      title: 'less than minimum',
      description: `must be greater than the minimum value of ${min}`,
    });
    return this;
  }

  public closedMin(min: number): this {
    this.min(min);
    return this;
  }

  public openMin(min: number): this {
    this.addNonRequiredInternalTestFunction((n) => n > min, {
      title: 'less than or equal to minimum',
      description: `must be greater than the open minimum value of ${min}`,
    });
    return this;
  }

  public max(max: number): this {
    this.addNonRequiredInternalTestFunction((n) => n <= max, {
      title: 'greater than maximum',
      description: `must be less than the maximum value of ${max}`,
    });
    return this;
  }

  public closedMax(max: number): this {
    this.max(max);
    return this;
  }

  public openMax(max: number): this {
    this.addNonRequiredInternalTestFunction((n) => n < max, {
      title: 'greater than or equal to maximum',
      description: `must be less than the open maximum value of ${max}`,
    });
    return this;
  }

  public closedInterval(min: number, max: number): this {
    this.addNonRequiredInternalTestFunction((n) => n >= min && n <= max, {
      title: 'outside closed interval',
      description: `outside of the closed interval of [${min},${max}]`,
    });
    return this;
  }

  public openInterval(min: number, max: number): this {
    this.addNonRequiredInternalTestFunction((n) => n > min && n < max, {
      title: 'outside open interval',
      description: `outside of the open interval of (${min},${max})`,
    });
    return this;
  }

  public test(n: number): ValidationRuleResult {
    return super.test(n);
  }
}
