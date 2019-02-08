import { Rule } from '../rule';

export function extractRule<T, R extends Rule<T>>(r: {rule?: any}): (r: R) => R {
  return (r2: R): R => {
    r.rule = r2;
    return r2;
  };
}
