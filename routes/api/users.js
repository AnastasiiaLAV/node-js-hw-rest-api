const express = require("express")

const {ctrlWrapp} = require('../../helpers')

const {userCurrent} = require('../../middlewares')

const ctrl = require('../../controllers/auth/index')

const router = express.Router()


router.get('/current', userCurrent, ctrlWrapp(ctrl.register))

// router.patch('/users', isValidId, validateBody(schemas.), ctrlWrapp(ctrl.))   //////subscription ['starter', 'pro', 'business']

module.exportrs = router;