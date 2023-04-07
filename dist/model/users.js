"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
const getUsers = async () => exports.UserModel.find({});
exports.getUsers = getUsers;
const getUserByEmail = async (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = async (sessionToken) => exports.UserModel.findOne({
    'authenfication.sessionToken': sessionToken
});
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = async (id) => exports.UserModel.findOne({ _id: id });
exports.getUserById = getUserById;
const createUser = async (values) => new exports.UserModel(values)
    .save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = async (id) => exports.UserModel.deleteOne({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = async (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map