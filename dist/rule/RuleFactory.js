"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanRule_1 = require("./BooleanRule");
const NumberRule_1 = require("./NumberRule");
const Rule_1 = require("./Rule");
const StringRule_1 = require("./StringRule");
class RuleFactory extends Rule_1.Rule {
    string() {
        return new StringRule_1.StringRule();
    }
    number() {
        return new NumberRule_1.NumberRule();
    }
    boolean() {
        return new BooleanRule_1.BooleanRule();
    }
    any() {
        return new Rule_1.Rule();
    }
}
exports.RuleFactory = RuleFactory;
function createValidationRule(opts) {
    return new RuleFactory(opts);
}
exports.createValidationRule = createValidationRule;
//# sourceMappingURL=RuleFactory.js.map