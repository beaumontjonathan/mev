"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanRule_1 = require("../rule/BooleanRule");
const Field_1 = require("./Field");
exports.defaultBooleanFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new BooleanRule_1.BooleanRule() });
class BooleanField extends Field_1.Field {
    constructor(opts = exports.defaultBooleanFieldOptions) {
        super(opts);
    }
}
exports.BooleanField = BooleanField;
//# sourceMappingURL=BooleanField.js.map