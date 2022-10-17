const express = require('express')
const path = require('path')

const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./utils/db')

const { errorHandler, notFound } = require('./middleware/errorMiddleware')

//Calling DB Connection
connectDB()

//Initializing Express Instance
const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes

//Serve Frontend

//Middleware
app.use(errorHandler)

//Port Assignment and listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
)
