const express = require("express")

const {ctrlWrapp} = require('../../helpers')

const {schemas} = require('../../models/user')

const ctrl = require('../../controllers/auth')

const {validateBody, userCurrent} = require('../../middlewares')


const router = express.Router()

router.post('/singup', validateBody(schemas.registerSchema), ctrlWrapp(ctrl.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapp(ctrl.login))

router.get("/current", userCurrent, ctrlWrapp(ctrl.getCurrent))

router.get("/logout", userCurrent, ctrlWrapp(ctrl.logout))

router.patch('/subscrip', userCurrent, validateBody(schemas.subscriptionSchema), ctrlWrapp(ctrl.updateSubscription))


module.exports = router;