import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  registerTimestamp: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  localRegisteredUser: { type: String, required: true },
  googleRegisteredUser: { type: String, required: true },
  imageUrl: { type: String },
});

export default mongoose.model('User', userSchema, 'UserDetailsCollection');
