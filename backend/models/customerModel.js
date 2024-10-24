// models/customerModel.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  // Add other fields as needed
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
