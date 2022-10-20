const express = require('express')

const router = express.Router()

const {ctrlWrapp} = require('../../helpers')

const ctrl = require('../../controllers/contacts/index')

const {validateBody, isValidId} = require('../../middlewares')

const {schemas} = require('../../models/contacts')

router.get('/', ctrlWrapp(ctrl.getAll))

router.get('/:contactId', isValidId,  ctrlWrapp(ctrl.getContactById))

router.post('/', validateBody(schemas.addSchema), ctrlWrapp(ctrl.addContact))

router.delete('/:contactId', isValidId, ctrlWrapp(ctrl.removeContact))

router.put('/:contactId', isValidId, validateBody(schemas.updateSchema), ctrlWrapp(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapp(ctrl.updateContact))

module.exports = router;
