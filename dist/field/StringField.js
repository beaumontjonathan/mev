"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringRule_1 = require("../rule/StringRule");
const Field_1 = require("./Field");
exports.defaultStringFieldOptions = Object.assign({}, Field_1.defaultFieldOptions, { rule: new StringRule_1.StringRule() });
class StringField extends Field_1.Field {
    constructor(opts = exports.defaultStringFieldOptions) {
        super(opts);
    }
}
exports.StringField = StringField;
//# sourceMappingURL=StringField.js.map