import mongoose from 'mongoose';
import User from './userSchema.js';

const requestSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model (the one who made the request)
    required: true,
  },
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model (the service provider receiving the request)
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model (the customer)
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
