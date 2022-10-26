const express = require("express")

const {ctrlWrapp} = require('../../helpers')

const {schemas} = require('../../models/user')

const ctrl = require('../../controllers/auth/index')

const {validateBody} = require('../../middlewares')


const router = express.Router()

router.post('/singup', validateBody(schemas.registerSchema), ctrlWrapp(ctrl.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapp(ctrl.login))

// router.get('/logout', validateBody(schemas.registerSchema), ctrlWrapp(ctrl.register))

// router.patch('/users', isValidId, validateBody(schemas.), ctrlWrapp(ctrl.))   //////subscription ['starter', 'pro', 'business']

module.exports = router;