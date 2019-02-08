"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const Field_1 = require("./Field");
exports.defaultStringFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new rule_1.StringRule() });
class StringField extends Field_1.Field {
    constructor(opts = exports.defaultStringFieldOptions) {
        super(opts);
    }
}
exports.StringField = StringField;
//# sourceMappingURL=StringField.js.map