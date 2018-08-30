"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const BooleanField_1 = require("./BooleanField");
const Field_1 = require("./Field");
const FieldFactory_1 = require("./FieldFactory");
const NumberField_1 = require("./NumberField");
const StringField_1 = require("./StringField");
describe('FieldFactory', () => {
    describe('constructor', () => {
        chai_1.expect(new FieldFactory_1.FieldFactory()).to.be.an.instanceOf(Field_1.Field);
    });
    describe('string', () => {
        it('should return a new StringRule', () => {
            chai_1.expect(new FieldFactory_1.FieldFactory().string()).to.be.an.instanceOf(StringField_1.StringField);
        });
    });
    describe('number', () => {
        it('should return a new NumberRule', () => {
            chai_1.expect(new FieldFactory_1.FieldFactory().number()).to.be.an.instanceOf(NumberField_1.NumberField);
        });
    });
    describe('boolean', () => {
        it('should return a new BooleanRule', () => {
            chai_1.expect(new FieldFactory_1.FieldFactory().boolean()).to.be.an.instanceOf(BooleanField_1.BooleanField);
        });
    });
    describe('any', () => {
        it('should return a new generic Rule', () => {
            chai_1.expect(new FieldFactory_1.FieldFactory().any()).to.be.an.instanceOf(Field_1.Field);
        });
    });
});
describe('createValidationField', () => {
    it('should return new FieldFactory', () => {
        const fieldFactory = FieldFactory_1.createValidationField();
        chai_1.expect(fieldFactory).to.be.an.instanceOf(FieldFactory_1.FieldFactory);
    });
});
//# sourceMappingURL=FieldFactory.spec.js.map