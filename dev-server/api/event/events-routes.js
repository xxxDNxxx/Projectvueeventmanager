import express from 'express'
const router = express.Router()
import * as controller from './events-controller'

router.post('/event', controller.create)

router.get('/event', controller.index)

router.get('/event/:id', controller.show)

router.put('/event', controller.update)

router.delete('/event', controller.remove)

export default router;