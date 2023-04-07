"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const appswagger = (0, express_1.default)();
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation using Swagger'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
appswagger.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = appswagger;
//# sourceMappingURL=swagger.js.map