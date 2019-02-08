"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const Field_1 = require("./Field");
exports.defaultBooleanFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new rule_1.BooleanRule() });
class BooleanField extends Field_1.Field {
    constructor(opts = exports.defaultBooleanFieldOptions, rules = []) {
        super(opts, rules);
    }
    clone() {
        return new BooleanField(this.opts, [...this.rules]);
    }
}
exports.BooleanField = BooleanField;
//# sourceMappingURL=BooleanField.js.map