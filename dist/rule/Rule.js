"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTestRunner_1 = require("./RuleTestRunner");
exports.defaultRuleOptions = {};
class Rule {
    constructor(opts = exports.defaultRuleOptions) {
        this.opts = Object.assign({}, exports.defaultRuleOptions, opts);
        this.testRunner = new RuleTestRunner_1.RuleTestRunner(Object.assign({}, opts));
    }
    static valueIsEmpty(value) {
        return value === undefined || value === null;
    }
    title(t) {
        this.internalTitle = t;
        return this;
    }
    description(d) {
        this.internalDescription = d;
        return this;
    }
    required() {
        this.addInternalTestFunction((data) => !Rule.valueIsEmpty(data), {
            title: 'required',
            description: `is required to have a value`,
        });
        return this;
    }
    addTestFunction(test) {
        this.testRunner.addTest({ test });
        return this;
    }
    addNonRequiredTestFunction(test) {
        const combinedTest = (data) => Rule.valueIsEmpty(data) || test(data);
        this.addTestFunction(combinedTest);
        return this;
    }
    test(data) {
        const validationRuleResult = this.testRunner.run(data);
        const fieldName = this.getFieldNameOrEmpty();
        const init = this.opts.useFieldName ? fieldName : '';
        if (this.resultIsError(validationRuleResult)) {
            return {
                title: init + (this.internalTitle || validationRuleResult.title),
                description: init + (this.internalDescription || validationRuleResult.description),
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
    addNonRequiredInternalTestFunction(test, defaultError) {
        const combinedTest = (data) => Rule.valueIsEmpty(data) || test(data);
        this.addInternalTestFunction(combinedTest, defaultError);
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