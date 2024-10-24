// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pincode: Number,
  phone: String,
  address: String,
  accountType: { type: String, enum: ['customer', 'serviceProvider'], required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
