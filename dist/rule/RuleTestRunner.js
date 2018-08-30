"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultRuleTestRunnerOptions = {
    defaultErrorJoiner: ', ',
};
class RuleTestRunner {
    constructor(opts = defaultRuleTestRunnerOptions) {
        this.opts = opts;
        this.testGroup = [];
    }
    addTest(testAndOptionalDefaultError) {
        this.testGroup.push(testAndOptionalDefaultError);
    }
    addTests(testAndOptionalDefaultErrors) {
        this.testGroup.push.apply(this.testGroup, testAndOptionalDefaultErrors);
    }
    run(data) {
        if (this.failsInitialTest(data)) {
            return this.getInitialTypeTestError(data);
        }
        else if (this.testsHaveFailed(data)) {
            return this.getDefaultError(data);
        }
        else {
            return { success: true };
        }
    }
    failsInitialTest(data) {
        return !!(this.opts.initialTypeTestType && typeof data !== this.opts.initialTypeTestType);
    }
    getInitialTypeTestError(data) {
        return {
            success: false,
            title: `type must be ${this.opts.initialTypeTestType}`,
            description: `must have type '${this.opts.initialTypeTestType}' but was really of type '${typeof data}'`,
        };
    }
    testsHaveFailed(data) {
        return (this.getFailedTests(data).length > 0 ||
            (this.opts.failOnEmptyTestList && this.testGroup.length === 0));
    }
    getFailedTests(data) {
        return this.testGroup.filter(({ test }) => !test(data));
    }
    getFailedTestDefaultErrors(data) {
        return this.getFailedTests(data)
            .filter((testGroup) => testGroup.defaultError)
            .map((testGroup) => testGroup.defaultError);
    }
    getDefaultError(data) {
        const failedRuleDefaultErrors = this.getFailedTestDefaultErrors(data);
        const title = failedRuleDefaultErrors
            .map((defaultError) => defaultError.title)
            .join(this.opts.defaultErrorJoiner);
        const description = failedRuleDefaultErrors
            .map((defaultError) => defaultError.description)
            .join(this.opts.defaultErrorJoiner);
        return {
            success: false,
            title,
            description,
        };
    }
}
exports.RuleTestRunner = RuleTestRunner;
//# sourceMappingURL=RuleTestRunner.js.map