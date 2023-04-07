import express from 'express'
const router = express.Router()
import authenfication from './authenfication'

export default (): express.Router => {
  authenfication(router)
  return router
}