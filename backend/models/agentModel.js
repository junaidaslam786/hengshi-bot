import { mongoose } from 'mongoose';

// Define a schema for the response
const responseSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a model for the response
const Response = mongoose.model('Response', responseSchema);

export default Response;
