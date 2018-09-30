import { Schema } from '..';
import { Validation, ValidationError, ValidationSuccess } from '../types/Validation';

export function isSuccess(val: Validation): val is ValidationSuccess {
  return (val as ValidationSuccess).success;
}

export function isError(val: Validation): val is ValidationError {
  return !(val as ValidationSuccess).success;
}

export interface MiddlewareOptions {
  ignoredParamsInReturn: string[];
}

const defaultMiddlewareOptions: MiddlewareOptions = {
  ignoredParamsInReturn: [],
};

function deleteMatchingAttributes(obj: any, attributes: string[]): any {
  return Object.keys(obj)
    .filter((prop) => !attributes.includes(prop))
    .map((prop) => ({
      p: prop,
      d: typeof obj[prop] === 'object' ? deleteMatchingAttributes(obj[prop], attributes) : obj[prop],
    }))
    .reduce((o, {p, d}) => ({ ...o, [p]: d }), {});
}

export const middlewave =
  (schema: Schema, options: MiddlewareOptions = defaultMiddlewareOptions) =>
    (req: any, res: any, next: () => {}) => {
      options = { ...defaultMiddlewareOptions, ...options };
      if (req.body && req.body && req.body.data === 'object') {
        const validation = schema.run(req.body.data);
        if (isSuccess(validation)) {
          next();
        } else {
          const { errors } = validation;
          res.status(422).json({
            status: 'failure',
          });
        }
      }
};
