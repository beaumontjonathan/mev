import { ValidationRuleError } from './ValidationRule';
export interface Validation {
    success: boolean;
    errors?: ValidationRuleError[];
}
