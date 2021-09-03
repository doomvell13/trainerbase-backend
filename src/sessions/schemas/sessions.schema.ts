import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop()
  meeting_id: String;
  @Prop()
  client_uid: String;
  @Prop()
  trainer_uid: String;
  @Prop()
  title: String;
  @Prop()
  date: String;
  @Prop()
  start: String;
  @Prop()
  end: String;
  @Prop()
  date_posted: String;
  @Prop()
  verification: Boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
