import express from 'express';
import { login, register, index, information, informationid, deletedata, putdata } from '../controllers/authentication';
import { userMiddleware } from '../middleware';

export default (router: express.Router) => {
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
  router.get('/', index);
  
  // Add Swagger annotations for other routes here
  // ...
  
  router.post('/register', register);
  router.post('/login', login);
  router.get('/information', information);
  router.get('/information/:id', informationid);
  router.delete('/:id', userMiddleware, deletedata);
  router.put('/information', userMiddleware, putdata);
}
