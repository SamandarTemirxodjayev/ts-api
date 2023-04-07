"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, 'mysecretkey');
        if (typeof decoded === 'object' && 'email' in decoded) {
            req.email = decoded.email;
            return next();
        }
        else {
            throw new Error('Invalid token');
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Not Authorized!", message: error.message });
    }
};
exports.userMiddleware = userMiddleware;
//# sourceMappingURL=index.js.map