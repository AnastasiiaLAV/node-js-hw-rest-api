const express = require("express")

const {ctrlWrapp} = require('../../helpers')

const {schemas} = require('../../models/user')

const ctrl = require('../../controllers/auth')

const {validateBody, userCurrent, upload} = require('../../middlewares')

const router = express.Router()


router.post('/singup', validateBody(schemas.registerSchema), ctrlWrapp(ctrl.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapp(ctrl.login))

router.get("/current", userCurrent, ctrlWrapp(ctrl.getCurrent))

router.get("/logout", userCurrent, ctrlWrapp(ctrl.logout))

router.patch('/subscrip', userCurrent, validateBody(schemas.subscriptionSchema), ctrlWrapp(ctrl.updateSubscription))

router.patch('/avatars', userCurrent, upload.single("avatar"), ctrlWrapp(ctrl.updateAvatar))

router.get('/verify/:verificationToken', )

router.post('/verify/', )

module.exports = router;