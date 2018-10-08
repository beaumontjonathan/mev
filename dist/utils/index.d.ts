import { Validation, ValidationError, ValidationSuccess } from '../types/Validation';
export declare function isSuccess(val: Validation): val is ValidationSuccess;
export declare function isError(val: Validation): val is ValidationError;
