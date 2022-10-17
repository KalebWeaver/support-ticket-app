const express = require('express')
const router = express.Router({ mergeParams: true })

//Controller Import
const { loginUser, registerUser } = require('../controllers/userController')

//Middleware Import
const { protect } = require('../middleware/authMiddleware')

//Unprotected Routes
router.post('/login', loginUser)
router.post('/register', registerUser)

//Protected Routes

module.exports = router
