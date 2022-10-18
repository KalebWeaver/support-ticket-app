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

    const token = accessToken(newUser)
    const refresh = refreshToken(newUser)

    res.cookie('jwt', refresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    res.status(200).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      throw new Error('Invalid Credentials')
    }

    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('Invalid Credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error('Invalid Credentials')
    }

    const token = accessToken(user)
    const refresh = refreshToken(user)

    res.cookie('jwt', refresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
      token,
    })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

const refreshUser = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      throw new Error('No token')
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error('No user found')
    }

    const newToken = accessToken(user)

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
      token: newToken,
    })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(204)
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
  res.json({ message: 'Logged out' })
})

function accessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      profile: user.profile,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
  )
}

function refreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      profile: user.profile,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )
}

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  refreshUser,
}
