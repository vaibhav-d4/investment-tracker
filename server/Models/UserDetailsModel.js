import mongoose from 'mongoose';

const userSchema = await mongoose.Schema({
  registerTimestamp: { type: String, required: true },
  googleUser: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema, 'UserDetailsCollection');
