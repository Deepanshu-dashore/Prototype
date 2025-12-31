import mongoose from 'mongoose';

export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    if (connection) {
      console.log('Connected to MongoDB')
    }
  } catch (error) {
    console.error("backend error: ", error)
    process.exit(1)
  }
}

export default connect;