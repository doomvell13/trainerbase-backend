// import * as mongoose from 'mongoose';
// import * as dotenv from 'dotenv';
// import { SessionSchema } from '../src/sessions/schemas/sessions.schema';
// import { sessionsData } from './sessionsdata';

// dotenv.config();

// mongoose.connect(process.env.MONGO_URL, {}, async (error) => {
//   if (error) {
//     console.log(error.message);
//   }
//   const connection = mongoose.connection;
//   const SessionModel = connection.model('Session', SessionSchema);
//   console.log(sessionsData);
//   await SessionModel.insertMany(sessionsData);
//   console.log(SessionModel);
//   await connection.close();
// });
