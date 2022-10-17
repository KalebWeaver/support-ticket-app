const { model, Schema } = require('mongoose')

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In Progress', 'Closed'],
  },
  username: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      username: {
        type: String,
      },
      body: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
})

module.exports = model('Ticket', ticketSchema)
