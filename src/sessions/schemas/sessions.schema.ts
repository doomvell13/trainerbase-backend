import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  meeting_id: String,
  client_uid: String,
  trainer_uid: String,
  title: String,
  date: String,
  startTime: String,
  endTime: String,
  date_posted: String,
  verification: Boolean,
});
