import express from 'express'

import { register } from '../controllers/authentication'

export default (router: express.Router) => {
  router.get('/auth/register', register)
}