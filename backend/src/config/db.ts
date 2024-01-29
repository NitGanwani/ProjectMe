import mongoose from 'mongoose';
import 'dotenv/config';

const dbConnect = () => {
  const user = process.env.USER_DB;
  const password = process.env.PASSWORD_DB;
  const dbName = process.env.NAME_DB;
  const uri = `mongodb+srv://${user}:${password}@cluster0.g5afsah.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};

export default dbConnect;
