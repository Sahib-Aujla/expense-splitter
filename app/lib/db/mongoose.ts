import mongoose from 'mongoose';
const connect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!, { dbName: 'expense_splitter' });
  console.log('Connected to MongoDB');
};
export default connect;