"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberRule_1 = require("../rule/NumberRule");
const Field_1 = require("./Field");
exports.defaultNumberFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new NumberRule_1.NumberRule() });
class NumberField extends Field_1.Field {
    constructor(opts = exports.defaultNumberFieldOptions) {
        super(opts);
    }
}
exports.NumberField = NumberField;
//# sourceMappingURL=NumberField.js.map