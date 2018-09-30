import { Rule } from '../rule/Rule';
import { Validation } from '../types/Validation';
import { ValidationRuleError, ValidationRuleResult, ValidationRuleSuccess } from '../types/ValidationRule';

export interface FieldOptions {
  rule?: Rule<any>;
  fieldName?: string;
  useFieldName?: boolean;
}

export const defaultFieldOptions: FieldOptions = {
  rule: new Rule(),
  useFieldName: false,
};

export class Field<T, R extends Rule<T>> {
  protected opts: FieldOptions;
  protected rules: R[];

  constructor(opts: FieldOptions = defaultFieldOptions) {
    this.opts = { ... defaultFieldOptions, ...opts };
    this.rules = [];
  }

  public addRule(r: R): this;
  public addRule(fn: (r: R) => R): this;
  public addRule(d: R | ((r: R) => R)): this {
    if (typeof d === 'function') {
      return this.addRule(d(this.getNewRule()));
    } else {
      if (!(d instanceof (this.opts.rule).constructor)) {
        const ruleType = d.constructor && d.constructor.name;
        const requiredType = this.opts.rule.constructor.name;
        throw new Error(
          `Rule of type ${ruleType} does not extend the required rule of type ${requiredType}.`,
        );
      }
      this.rules.push(d);
      return this;
    }
  }

  public validate(d: T): Validation {
    const errors: ValidationRuleError[] = this.rules
      .map((r) => r.test(d))
      .filter((r) => ruleIsError(r))
      .reduce((t, e) => t.concat(e), []);
    if (errors.length === 0) {
      return { success: true };
    } else {
      return { errors };
    }
  }

  protected getNewRule(): R {
    return new (Object.getPrototypeOf(this.opts.rule).constructor)(this.opts);
  }
}

function ruleIsError(r: ValidationRuleResult): r is ValidationRuleError {
  return !(r as ValidationRuleSuccess).success;
}
