import { ValidationRuleError, ValidationRuleSuccess } from '../types/ValidationRule';
export declare const emptyFail: ValidationRuleError;
export declare const success: ValidationRuleSuccess;
export declare const emptyData: any;
export declare const truthyTest: (o: any) => boolean;
export declare const falsyTest: (o: any) => boolean;
export declare const truthyRule: import("../rule/Rule").Rule<any>;
export declare const falsyRule: import("../rule/Rule").Rule<any>;
