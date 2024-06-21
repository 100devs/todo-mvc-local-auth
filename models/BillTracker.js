const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const BillTrackerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountDue: {
    type: Float,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true 
  }


})



module.exports = mongoose.model('BillTracker', BillTrackerSchema)
