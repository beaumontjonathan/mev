"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const Field_1 = require("./Field");
exports.defaultNumberFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new rule_1.NumberRule() });
class NumberField extends Field_1.Field {
    constructor(opts = exports.defaultNumberFieldOptions, rules = []) {
        super(opts, rules);
    }
    clone() {
        return new NumberField(this.opts, [...this.rules]);
    }
}
exports.NumberField = NumberField;
//# sourceMappingURL=NumberField.js.map