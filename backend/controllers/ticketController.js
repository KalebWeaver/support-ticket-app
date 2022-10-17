const asyncHandler = require('express-async-handler')

const { validateTicketInput } = require('../utils/validators')

const User = require('../models/User')
const Ticket = require('../models/Ticket')

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({})

    if (!tickets) {
      throw new Error('No tickets found')
    }

    res.status(200).json(tickets)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// @desc    Get Single Ticket
// @route   GET /api/tickets/:ticketId
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  try {
    const { ticketId } = req.params

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    res.status(200).json(ticket)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// @desc    Create Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  try {
    const { title, description, username } = req.body

    const { valid, errors } = validateTicketInput(title, description, username)

    if (!valid) {
      throw new Error(errors)
    }

    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('User not found')
    }

    const newTicket = new Ticket({
      title,
      description,
      status: 'Open',
      username,
      user: user._id,
      createdAt: new Date().toISOString(),
    })

    const ticket = await newTicket.save()

    res.status(201).json(ticket)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Update Ticket
// @route   PUT /api/tickets/:ticketId
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  try {
    const { ticketId } = req.params
    const { status } = req.body

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.status = status
    await ticket.save()
    res.status(200).json(ticket)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// @desc    Create Message
// @route   POST /api/tickets/:ticketId/message
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  try {
    const { ticketId } = req.params
    const { username, body } = req.body
    if (body.trim() === '') {
      throw new Error('Message must not be empty')
    }

    const ticket = await Ticket.findById(ticketId)
    if (ticket) {
      if (ticket.status === 'Closed') {
        throw new Error('Ticket is closed')
      } else {
        ticket.messages.unshift({
          username,
          body,
          createdAt: new Date().toISOString(),
        })
        if (ticket.status === 'Open') {
          ticket.status = 'In Progress'
        }
        await ticket.save()
        res.status(200).json(ticket)
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  createMessage,
}
