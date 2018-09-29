import { ValidationRuleError } from './ValidationRule';
export declare type Validation = ValidationSuccess | ValidationError;
export interface ValidationSuccess {
    success: true;
}
export interface ValidationError {
    errors: ValidationRuleError[];
}
