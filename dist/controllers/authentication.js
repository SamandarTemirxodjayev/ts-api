"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_1 = require("../model/users");
const helpers_1 = require("../helpers");
const index_1 = require("../helpers/index");
const register = async (req, res) => {
    try {
        const { email, passwrod, username } = req.body;
        if (!email || !passwrod || !username) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const salt = await (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            passwrod,
            authentication: {
                salt,
                password: (0, index_1.authentication)(salt, passwrod)
            }
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map