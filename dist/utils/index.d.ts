import { Schema } from '..';
import { Validation, ValidationError, ValidationSuccess } from '../types/Validation';
export declare function isSuccess(val: Validation): val is ValidationSuccess;
export declare function isError(val: Validation): val is ValidationError;
export interface MiddlewareOptions {
    ignoredParamsInReturn: string[];
}
export declare const middlewave: (schema: Schema, options?: MiddlewareOptions) => (req: any, res: any, next: () => {}) => void;
