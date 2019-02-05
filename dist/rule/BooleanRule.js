"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
exports.defaultBooleanRuleOptions = Object.assign({}, Rule_1.defaultRuleOptions, { initialTypeTestType: 'boolean' });
class BooleanRule extends Rule_1.Rule {
    constructor(opts = exports.defaultBooleanRuleOptions) {
        super(opts);
    }
    true() {
        this.addNonRequiredInternalTestFunction((b) => b, {
            title: 'not true',
            description: 'must be true',
        });
        return this;
    }
    false() {
        this.addNonRequiredInternalTestFunction((b) => !b, {
            title: 'not false',
            description: 'must be false',
        });
        return this;
    }
    test(b) {
        return super.test(b);
    }
}
exports.BooleanRule = BooleanRule;
//# sourceMappingURL=BooleanRule.js.map