const Router = require("express")
const router = new Router()
const accountController = require('../controller/account.controller')

router.post('/account', accountController.createAccount)
router.get('/account', accountController.getAccount)

module.exports = router