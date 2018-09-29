import { Validation, ValidationError, ValidationSuccess } from '../types/Validation';

export function isSuccess(val: Validation): val is ValidationSuccess {
  return (val as ValidationSuccess).success;
}

export function isError(val: Validation): val is ValidationError {
  return !(val as ValidationSuccess).success;
}
