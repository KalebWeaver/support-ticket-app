const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//This file is middleware to have protected routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1]
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Not Authorized!')
      } else {
        throw new Error('Not Authorized! - Incorrect Token')
      }
    }
  }

  //throw error if there is no token
  if (!token) {
    res.status(401)
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Not Authorized!')
    } else {
      throw new Error('Not Authorized! - No Token')
    }
  }
})

module.exports = {
  protect,
}
