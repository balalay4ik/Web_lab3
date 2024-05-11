const Router = require("express")
const router = new Router()
const contactController = require('../controller/contact.controller')

router.post('/contact', contactController.createContact)
router.get('/contact/:id', contactController.getOneContacts)
router.get('/contact', contactController.getContacts)
router.put('/contact/:id', contactController.updateContacts)
router.delete('/contact/:id', contactController.deleteContacts)

module.exports = router