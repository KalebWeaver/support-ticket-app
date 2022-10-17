const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../utils/validators')

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    const { valid, errors } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    )

    if (!valid) {
      throw new Error(errors)
    }

    const user = await User.findOne({ username })
    if (user) {
      throw new Error('Username is taken')
    }

    const finalPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      username,
      email,
      password: finalPassword,
      roles: ['user'],
      createdAt: new Date().toISOString(),
    })

    const token = generateToken(newUser)

    res.status(201).json({
      ...user._doc,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body

    const { valid, errors } = validateLoginInput(username, password)

    if (!valid) {
      throw new Error(errors)
    }

    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('Invalid Credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error('Invalid Credentials')
    }

    const token = generateToken(user)

    res.status(200).json({
      ...user._doc,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      profile: user.profile,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = {
  registerUser,
  loginUser,
}
