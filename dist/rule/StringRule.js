"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
exports.defaultStringRuleOptions = Object.assign({}, Rule_1.defaultRuleOptions, { initialTypeTestType: 'string' });
class StringRule extends Rule_1.Rule {
    constructor(opts = exports.defaultStringRuleOptions) {
        super(opts);
    }
    minLength(min) {
        this.addInternalTestFunction((str) => str && str.length >= min, {
            title: 'too short',
            description: `must be at least ${min} characters long`,
        });
        return this;
    }
    maxLength(max) {
        this.addInternalTestFunction((str) => !str || str.length <= max, {
            title: 'too long',
            description: `must not be longer than ${max} characters long`,
        });
        return this;
    }
    blacklist(list) {
        this.addInternalTestFunction((str) => !list.some((item) => str.includes(item)), {
            title: 'failed blacklist',
            description: `must not contain one of the blacklisted phrases '${list.join('\', \'')}'`,
        });
        return this;
    }
    upperCase() {
        this.addInternalTestFunction((str) => !/[a-z]/.test(str), {
            title: 'contains lowercase',
            description: 'must not contain lowercase characters',
        });
        return this;
    }
    lowerCase() {
        this.addInternalTestFunction((str) => !/[A-Z]/.test(str), {
            title: 'contains uppercase',
            description: 'must not contain uppercase characters',
        });
        return this;
    }
    alphanumeric() {
        this.addInternalTestFunction((str) => /^[a-zA-Z0-9]*$/.test(str), {
            title: 'not alphanumeric',
            description: 'must only contain letters and numbers',
        });
        return this;
    }
    regex(regex) {
        this.addInternalTestFunction((str) => regex.test(str), {
            title: 'failed regex',
            description: `failed the regular expression '${regex}'`,
        });
        return this;
    }
    test(str) {
        return super.test(str);
    }
}
exports.StringRule = StringRule;
//# sourceMappingURL=StringRule.js.map