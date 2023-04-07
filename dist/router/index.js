"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenfication_1 = __importDefault(require("./authenfication"));
exports.default = () => {
    (0, authenfication_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map