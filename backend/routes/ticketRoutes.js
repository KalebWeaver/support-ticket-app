const express = require('express')
const router = express.Router({ mergeParams: true })

//Controller Import
const {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
  createMessage,
} = require('../controllers/ticketController')

//Middleware Import
const { protect } = require('../middleware/authMiddleware')

//Protected Routes
router.route('/').get(protect, getAllTickets).post(protect, createTicket)
router.route('/:ticketId').get(protect, getTicket).put(protect, updateTicket)
router.route('/:ticketId/message').post(protect, createMessage)

module.exports = router
