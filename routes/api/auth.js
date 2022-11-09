const express = require("express")

const {ctrlWrapp} = require('../../helpers')

const {schemas} = require('../../models/user')

const ctrl = require('../../controllers/auth')

const {validateBody, userCurrent, upload} = require('../../middlewares')

const router = express.Router()

// singup
router.post('/singup', validateBody(schemas.registerSchema), ctrlWrapp(ctrl.register))

router.get('/verify/:verificationToken', ctrlWrapp(ctrl.verify))

router.post('/verify/', validateBody(schemas.verifyEmailSchema), ctrlWrapp(ctrl.resendEmail))


// login
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapp(ctrl.login))

router.get("/current", userCurrent, ctrlWrapp(ctrl.getCurrent))

router.patch('/subscrip', userCurrent, validateBody(schemas.subscriptionSchema), ctrlWrapp(ctrl.updateSubscription))

router.patch('/avatars', userCurrent, upload.single("avatar"), ctrlWrapp(ctrl.updateAvatar))


// logout
router.get("/logout", userCurrent, ctrlWrapp(ctrl.logout))







module.exports = router;