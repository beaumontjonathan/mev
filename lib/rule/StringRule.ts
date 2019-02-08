import { ValidationRuleResult } from '../types';
import { defaultRuleOptions, Rule, RuleOptions } from './Rule';

export interface StringRuleOptions extends RuleOptions {}

export const defaultStringRuleOptions: StringRuleOptions = {
  ...defaultRuleOptions,
  initialTypeTestType: 'string',
};

export class StringRule extends Rule<string> {
  constructor(opts: StringRuleOptions = defaultStringRuleOptions) {
    super(opts);
  }

  public minLength(min: number): this {
    this.addNonRequiredInternalTestFunction((str) => str && str.length >= min, {
      title: 'too short',
      description: `must be at least ${min} characters long`,
    });
    return this;
  }

  public maxLength(max: number): this {
    this.addNonRequiredInternalTestFunction((str) => !str || str.length <= max, {
      title: 'too long',
      description: `must not be longer than ${max} characters long`,
    });
    return this;
  }

  public blacklist(list: string[]): this {
    this.addNonRequiredInternalTestFunction((str) => !list.some((item) => str.includes(item)), {
      title: 'failed blacklist',
      description: `must not contain one of the blacklisted phrases '${list.join('\', \'')}'`,
    });
    return this;
  }

  public upperCase(): this {
    this.addNonRequiredInternalTestFunction((str) => !/[a-z]/.test(str), {
      title: 'contains lowercase',
      description: 'must not contain lowercase characters',
    });
    return this;
  }

  public lowerCase(): this {
    this.addNonRequiredInternalTestFunction((str) => !/[A-Z]/.test(str), {
      title: 'contains uppercase',
      description: 'must not contain uppercase characters',
    });
    return this;
  }

  public alphanumeric(): this {
    this.addNonRequiredInternalTestFunction((str) => /^[a-zA-Z0-9]*$/.test(str), {
      title: 'not alphanumeric',
      description: 'must only contain letters and numbers',
    });
    return this;
  }

  public regex(regex: RegExp): this {
    this.addNonRequiredInternalTestFunction((str) => regex.test(str), {
      title: 'failed regex',
      description: `failed the regular expression '${regex}'`,
    });
    return this;
  }

  public test(str: string): ValidationRuleResult {
    return super.test(str);
  }
}
