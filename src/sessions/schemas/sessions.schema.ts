import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop()
  session_id: string;

  @Prop()
  client_uid: string;

  @Prop()
  trainer_uid: string;

  @Prop()
  title: string;

  @Prop()
  date: string;

  @Prop()
  start: string;

  @Prop()
  end: string;

  @Prop()
  date_posted: string;

  @Prop()
  verification: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
