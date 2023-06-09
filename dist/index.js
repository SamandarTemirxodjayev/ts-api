"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://Samandar:Samandar0321@cluster0.v86wyyu.mongodb.net/?retryWrites=true&w=majority';
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (error) => console.error(error));
app.use('/', (0, router_1.default)());
app.use('/api-docs/', swagger_1.default);
//# sourceMappingURL=index.js.map