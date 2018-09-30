"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSuccess(val) {
    return val.success;
}
exports.isSuccess = isSuccess;
function isError(val) {
    return !val.success;
}
exports.isError = isError;
const defaultMiddlewareOptions = {
    ignoredParamsInReturn: [],
};
function deleteMatchingAttributes(obj, attributes) {
    return Object.keys(obj)
        .filter((prop) => !attributes.includes(prop))
        .map((prop) => ({
        p: prop,
        d: typeof obj[prop] === 'object' ? deleteMatchingAttributes(obj[prop], attributes) : obj[prop],
    }))
        .reduce((o, { p, d }) => (Object.assign({}, o, { [p]: d })), {});
}
exports.middlewave = (schema, options = defaultMiddlewareOptions) => (req, res, next) => {
    options = Object.assign({}, defaultMiddlewareOptions, options);
    if (req.body && req.body && req.body.data === 'object') {
        const validation = schema.run(req.body.data);
        if (isSuccess(validation)) {
            next();
        }
        else {
            const { errors } = validation;
            res.status(422).json({
                status: 'failure',
            });
        }
    }
};
//# sourceMappingURL=index.js.map