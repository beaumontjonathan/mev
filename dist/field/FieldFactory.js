"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanField_1 = require("./BooleanField");
const Field_1 = require("./Field");
const NumberField_1 = require("./NumberField");
const StringField_1 = require("./StringField");
exports.defaultFieldFactoryOptions = {};
class FieldFactory extends Field_1.Field {
    constructor(opts = exports.defaultFieldFactoryOptions) {
        super(opts);
    }
    string(opts) {
        return new StringField_1.StringField(Object.assign({}, this.opts, opts, StringField_1.defaultStringFieldOptions));
    }
    number(opts) {
        return new NumberField_1.NumberField(Object.assign({}, this.opts, opts, NumberField_1.defaultNumberFieldOptions));
    }
    boolean(opts) {
        return new BooleanField_1.BooleanField(Object.assign({}, this.opts, opts, BooleanField_1.defaultBooleanFieldOptions));
    }
    any(opts) {
        return new Field_1.Field(Object.assign({}, this.opts, opts));
    }
}
exports.FieldFactory = FieldFactory;
function createValidationField(opts) {
    return new FieldFactory(opts);
}
exports.createValidationField = createValidationField;
//# sourceMappingURL=FieldFactory.js.map