"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Get Hello World
     *     description: Returns a JSON object with a greeting message "hello": "world".
     *     responses:
     *       200:
     *         description: Successful response with the greeting message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 hello:
     *                   type: string
     *                   example: world
     */
    router.get('/', authentication_1.index);
    // Add Swagger annotations for other routes here
    // ...
    router.post('/register', authentication_1.register);
    router.post('/login', authentication_1.login);
    router.get('/information', authentication_1.information);
    router.get('/information/:id', authentication_1.informationid);
    router.delete('/:id', middleware_1.userMiddleware, authentication_1.deletedata);
    router.put('/information', middleware_1.userMiddleware, authentication_1.putdata);
};
//# sourceMappingURL=authenfication.js.map