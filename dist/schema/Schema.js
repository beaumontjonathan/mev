"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldFactory_1 = require("../field/FieldFactory");
const utils_1 = require("../utils");
exports.defaultSchemaOptions = {};
class Schema {
    constructor(opts = exports.defaultSchemaOptions) {
        this.opts = opts;
        this.fields = new Map();
    }
    addField(fieldName, field) {
        this.ensureFieldNameIsUnique(fieldName);
        if (typeof field === 'function') {
            return this.addField(fieldName, field(new FieldFactory_1.FieldFactory(Object.assign({}, this.opts, { fieldName }))));
        }
        else {
            this.fields.set(fieldName, field);
            return this;
        }
    }
    addSchemaField(fieldName, schema) {
        this.ensureFieldNameIsUnique(fieldName);
        if (typeof schema === 'function') {
            return this.addSchemaField(fieldName, schema(new Schema()));
        }
        else {
            this.fields.set(fieldName, schema);
            return this;
        }
    }
    test(obj) {
        function objHasResultPropAsFailure(o) {
            return utils_1.isError(o.testResult);
        }
        function testFieldOrSchema(field, data) {
            if (isSchema(field)) {
                return field.test(data);
            }
            else {
                return field.test(data);
            }
        }
        const fieldAndResultToIncludeFieldNameAndOptionallyParent = (asdf) => {
            const { fieldName, testResult } = asdf;
            if (isSchema(this.fields.get(fieldName))) {
                return testResult.errors.map((error) => (Object.assign({ parent: fieldName }, error)));
            }
            else {
                return testResult.errors.map((error) => (Object.assign({ fieldName }, error)));
            }
        };
        const errors = Array
            .from(this.fields)
            .map(([fieldName, field]) => ({ fieldName, testResult: testFieldOrSchema(field, obj[fieldName]) }))
            .filter(objHasResultPropAsFailure)
            .map(fieldAndResultToIncludeFieldNameAndOptionallyParent)
            .reduce((t, e) => t.concat(e), []);
        return errors.length === 0 ? { success: true } : { errors };
    }
    ensureFieldNameIsUnique(fieldName) {
        if (this.fields.has(fieldName)) {
            throw new Error(`Field ${fieldName} already exists in schema. Duplicate field names are disallowed.`);
        }
    }
}
exports.Schema = Schema;
function isSchema(s) {
    return s instanceof Schema;
}
exports.isSchema = isSchema;
function createValidationSchema(opts) {
    return new Schema(opts);
}
exports.createValidationSchema = createValidationSchema;
//# sourceMappingURL=Schema.js.map