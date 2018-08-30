import { ValidationFactory } from '../types/ValidationFactory';
import { BooleanRule } from './BooleanRule';
import { NumberRule } from './NumberRule';
import { Rule } from './Rule';
import { StringRule } from './StringRule';

export class RuleFactory<T> extends Rule<T> implements ValidationFactory {
  public string(): StringRule {
    return new StringRule();
  }

  public number(): NumberRule {
    return new NumberRule();
  }

  public boolean(): BooleanRule {
    return new BooleanRule();
  }

  public any(): Rule<any> {
    return new Rule<any>();
  }
}

export function createValidationRule<T>(opts?: any): RuleFactory<T> {
  return new RuleFactory(opts);
}
