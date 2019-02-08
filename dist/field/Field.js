"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
exports.defaultFieldOptions = {
    rule: new rule_1.Rule(),
    useFieldName: false,
};
class Field {
    constructor(opts = exports.defaultFieldOptions, rules = []) {
        this.opts = Object.assign({}, exports.defaultFieldOptions, opts);
        this.rules = rules;
    }
    addRule(d) {
        if (typeof d === 'function') {
            return this.addRule(d(this.getNewRule()));
        }
        else {
            if (!(d instanceof (this.opts.rule).constructor)) {
                const ruleType = d.constructor && d.constructor.name;
                const requiredType = this.opts.rule.constructor.name;
                throw new Error(`Rule of type ${ruleType} does not extend the required rule of type ${requiredType}.`);
            }
            this.rules.push(d);
            return this;
        }
    }
    test(d) {
        const errors = this.rules
            .map((r) => r.test(d))
            .filter((r) => ruleIsError(r))
            .reduce((t, e) => t.concat(e), []);
        if (errors.length === 0) {
            return { success: true };
        }
        else {
            return { errors };
        }
    }
    clone() {
        return new Field(this.opts, [...this.rules]);
    }
    getNewRule() {
        return new (Object.getPrototypeOf(this.opts.rule).constructor)(this.opts);
    }
}
exports.Field = Field;
function ruleIsError(r) {
    return !r.success;
}
//# sourceMappingURL=Field.js.map