"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTestRunner_1 = require("./RuleTestRunner");
exports.defaultRuleOptions = {};
class Rule {
    constructor(opts = exports.defaultRuleOptions) {
        this.opts = opts;
        this.testRunner = new RuleTestRunner_1.RuleTestRunner(Object.assign({}, opts));
    }
    title(t) {
        this.internalTitle = t;
        return this;
    }
    description(d) {
        this.internalDescription = d;
        return this;
    }
    addTestFunction(test) {
        this.testRunner.addTest({ test });
        return this;
    }
    test(data) {
        const validationRuleResult = this.testRunner.run(data);
        const fieldName = this.getFieldNameOrEmpty();
        if (this.resultIsError(validationRuleResult)) {
            return {
                title: `${fieldName}${this.internalTitle || validationRuleResult.title}`,
                description: `${fieldName}${this.internalDescription || validationRuleResult.description}`,
            };
        }
        else {
            return { success: true };
        }
    }
    addInternalTestFunction(test, defaultError) {
        this.testRunner.addTest({ test, defaultError });
        return this;
    }
    getFieldNameOrEmpty() {
        return (this.opts.fieldName) ? `${this.opts.fieldName} ` : '';
    }
    resultIsError(r) {
        return !r.success;
    }
}
exports.Rule = Rule;
//# sourceMappingURL=Rule.js.map