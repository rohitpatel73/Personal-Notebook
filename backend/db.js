import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.REACT_APP_MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Mongo Successfully');
  } catch (err) {
    console.error('Mongo connection failed:', err);
  }
};

export default connectToMongo;
