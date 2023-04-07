"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putdata = exports.deletedata = exports.informationid = exports.information = exports.login = exports.register = exports.index = void 0;
const users_1 = require("../model/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const earthquake_1 = require("../model/earthquake");
const index = async (req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
};
exports.index = index;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            console.log(email, password, username);
            return res.status(400).json({ error: 'Please fill all fields' });
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await (0, users_1.createUser)({
            username,
            email,
            password
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log(email, password);
            return res.status(400).json({ error: 'Please fill all fields' });
        }
        const user = await (0, users_1.getUserByEmail)(email);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: 'Wrong password' });
        }
        const payload = { email: email };
        const secretKey = 'mysecretkey';
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token: token }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
exports.login = login;
const information = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 20;
        const skip = (page - 1) * limit;
        const yer = await earthquake_1.EarthquakeModel.find({}).skip(skip).limit(limit);
        res.json(yer);
    }
    catch (error) {
        // Handle any errors that occur during the async operation
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.information = information;
const informationid = async (req, res) => {
    try {
        const { id } = req.params;
        const yer = await earthquake_1.EarthquakeModel.findById(id);
        if (!yer) {
            return res.status(404).json({ error: 'No earthquake found' });
        }
        res.json(yer);
    }
    catch (error) {
        console.log(error);
    }
};
exports.informationid = informationid;
const deletedata = async (req, res) => {
    try {
        const { id } = req.params;
        const yer = await earthquake_1.EarthquakeModel.findByIdAndDelete(id);
        if (!yer) {
            return res.status(404).json({ error: 'No earthquake found' });
        }
        res.json({ "deleted": "Earthquake deleted" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deletedata = deletedata;
const putdata = async (req, res) => {
    const { latitude, longitude, depth, mag, magType, nst, gap, dmin, rms, net, id, updated, place, type, horizontalError, depthError, magError, magNst, status, locationSource, magSource } = req.body;
    if (!latitude || !longitude || !depth || !mag || !magType || !nst || !gap || !dmin || !rms || !net || !id || !updated || !place || !type || !horizontalError || !depthError || !magError || !magNst || !status || !locationSource || !magSource) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    const yerdata = {
        latitude,
        longitude,
        depth,
        mag,
        magType,
        nst,
        gap,
        dmin,
        rms,
        net,
        id,
        updated,
        place,
        type,
        horizontalError,
        depthError,
        magError,
        magNst,
        status,
        locationSource,
        magSource
    };
    const newYer = new earthquake_1.EarthquakeModel(yerdata);
    newYer.save()
        .then(() => {
        res.json({ "saved": "Earthquake saved", newYer });
    })
        .catch((error) => {
        console.error('Error saving new user:', error);
    });
};
exports.putdata = putdata;
//# sourceMappingURL=authentication.js.map