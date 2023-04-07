import express from 'express'

import { login, register, index, information, informationid, deletedata, putdata } from '../controllers/authentication';
import { userMiddleware } from '../middleware';

export default (router: express.Router) => {
  router.get('/', index)
  router.post('/register', register)
  router.post('/login', login)
  router.get('/information', information)
  router.get('/information/:id', informationid)
  router.delete('/:id',userMiddleware, deletedata)
  router.put('/information',userMiddleware, putdata)
}
