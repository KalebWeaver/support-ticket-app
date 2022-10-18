const express = require('express')
const router = express.Router({ mergeParams: true })

//Controller Import
const {
  loginUser,
  logoutUser,
  registerUser,
  refreshUser,
} = require('../controllers/authController')

//Middleware Import
const { protect } = require('../middleware/authMiddleware')

//Unprotected Routes
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/register', registerUser)
router.get('/refresh', refreshUser)

//Protected Routes

module.exports = router
