"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const index_1 = require("./index");
describe('add', () => {
    it('should add even numbers', () => {
        chai_1.expect(index_1.default(1, 2)).to.equal(3);
    });
});
//# sourceMappingURL=index.spec.js.map