"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
exports.defaultNumberRuleOptions = Object.assign({}, Rule_1.defaultRuleOptions, { initialTypeTestType: 'number' });
class NumberRule extends Rule_1.Rule {
    constructor(opts = exports.defaultNumberRuleOptions) {
        super(opts);
    }
    min(min) {
        this.addNonRequiredInternalTestFunction((n) => n >= min, {
            title: 'less than minimum',
            description: `must be greater than the minimum value of ${min}`,
        });
        return this;
    }
    closedMin(min) {
        this.min(min);
        return this;
    }
    openMin(min) {
        this.addNonRequiredInternalTestFunction((n) => n > min, {
            title: 'less than or equal to minimum',
            description: `must be greater than the open minimum value of ${min}`,
        });
        return this;
    }
    max(max) {
        this.addNonRequiredInternalTestFunction((n) => n <= max, {
            title: 'greater than maximum',
            description: `must be less than the maximum value of ${max}`,
        });
        return this;
    }
    closedMax(max) {
        this.max(max);
        return this;
    }
    openMax(max) {
        this.addNonRequiredInternalTestFunction((n) => n < max, {
            title: 'greater than or equal to maximum',
            description: `must be less than the open maximum value of ${max}`,
        });
        return this;
    }
    closedInterval(min, max) {
        this.addNonRequiredInternalTestFunction((n) => n >= min && n <= max, {
            title: 'outside closed interval',
            description: `outside of the closed interval of [${min},${max}]`,
        });
        return this;
    }
    openInterval(min, max) {
        this.addNonRequiredInternalTestFunction((n) => n > min && n < max, {
            title: 'outside open interval',
            description: `outside of the open interval of (${min},${max})`,
        });
        return this;
    }
    test(n) {
        return super.test(n);
    }
}
exports.NumberRule = NumberRule;
//# sourceMappingURL=NumberRule.js.map