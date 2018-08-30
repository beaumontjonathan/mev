import { Rule } from '../rule/Rule';
export declare function extractRule<T, R extends Rule<T>>(r: {
    rule?: any;
}): (r: R) => R;
