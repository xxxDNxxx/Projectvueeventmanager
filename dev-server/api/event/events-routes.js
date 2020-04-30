import express from 'express'
const router = express.Router()
import * as controller from './events-controller'
import * as auth from '../../services/auth-service'


router.post('/event', auth.requireLogin, controller.create)

router.get('/event', auth.requireLogin, controller.index)

router.get('/event/:id', auth.requireLogin, controller.show)

router.put('/event', auth.requireLogin, controller.update)

router.delete('/event/:id', auth.requireLogin, controller.remove)

export default router;