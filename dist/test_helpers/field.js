"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractRule(r) {
    return (r2) => {
        r.rule = r2;
        return r2;
    };
}
exports.extractRule = extractRule;
//# sourceMappingURL=field.js.map