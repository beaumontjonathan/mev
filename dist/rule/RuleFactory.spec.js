"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const BooleanRule_1 = require("./BooleanRule");
const NumberRule_1 = require("./NumberRule");
const Rule_1 = require("./Rule");
const RuleFactory_1 = require("./RuleFactory");
const StringRule_1 = require("./StringRule");
describe('RuleFactory', () => {
    describe('constructor', () => {
        chai_1.expect(new RuleFactory_1.RuleFactory()).to.be.an.instanceOf(Rule_1.Rule);
    });
    describe('string', () => {
        it('should return a new StringRule', () => {
            chai_1.expect(new RuleFactory_1.RuleFactory().string()).to.be.an.instanceOf(StringRule_1.StringRule);
        });
    });
    describe('number', () => {
        it('should return a new NumberRule', () => {
            chai_1.expect(new RuleFactory_1.RuleFactory().number()).to.be.an.instanceOf(NumberRule_1.NumberRule);
        });
    });
    describe('boolean', () => {
        it('should return a new BooleanRule', () => {
            chai_1.expect(new RuleFactory_1.RuleFactory().boolean()).to.be.an.instanceOf(BooleanRule_1.BooleanRule);
        });
    });
    describe('any', () => {
        it('should return a new generic Rule', () => {
            chai_1.expect(new RuleFactory_1.RuleFactory().any()).to.be.an.instanceOf(Rule_1.Rule);
        });
    });
});
describe('createValidationRule', () => {
    it('should return new RuleFactory', () => {
        const ruleFactory = RuleFactory_1.createValidationRule();
        chai_1.expect(ruleFactory).to.be.an.instanceOf(RuleFactory_1.RuleFactory);
    });
});
//# sourceMappingURL=RuleFactory.spec.js.map