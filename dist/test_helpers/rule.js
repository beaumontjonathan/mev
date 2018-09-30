"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.emptyFail = {
    title: '',
    description: '',
};
exports.success = {
    success: true,
};
exports.emptyData = null;
exports.truthyTest = (o) => true;
exports.falsyTest = (o) => false;
exports.truthyRule = __1.createValidationRule().any().addTestFunction(exports.truthyTest);
exports.falsyRule = __1.createValidationRule().any().addTestFunction(exports.falsyTest);
//# sourceMappingURL=rule.js.map