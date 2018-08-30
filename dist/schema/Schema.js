"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldFactory_1 = require("../field/FieldFactory");
exports.defaultSchemaOptions = {};
class Schema {
    constructor(opts = exports.defaultSchemaOptions) {
        this.opts = opts;
        this.fields = new Map();
    }
    addField(fieldName, field) {
        if (typeof field === 'function') {
            return this.addField(fieldName, field(new FieldFactory_1.FieldFactory(Object.assign({}, this.opts, { fieldName }))));
        }
        else {
            if (this.fields.has(fieldName)) {
                throw new Error(`Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`);
            }
            this.fields.set(fieldName, field);
            return this;
        }
    }
    run(obj) {
        const errors = Array
            .from(this.fields)
            .map(([fieldName, field]) => ({ fieldName, result: field.validate(obj[fieldName]) }))
            .filter(({ result }) => !result.success)
            .map(({ fieldName, result }) => result.errors.map(({ title, description }) => ({
            title,
            description,
            fieldName,
        })))
            .reduce((t, e) => t.concat(e), []);
        if (errors.length === 0) {
            return { success: true };
        }
        else {
            return { success: false, errors };
        }
    }
}
exports.Schema = Schema;
function createValidationSchema(opts) {
    return new Schema(opts);
}
exports.createValidationSchema = createValidationSchema;
//# sourceMappingURL=Schema.js.map