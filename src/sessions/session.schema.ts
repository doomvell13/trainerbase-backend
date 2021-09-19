import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { Type } from 'class-transformer';
import { Category } from '../categories/category.schema';
export type SessionDocument = Session & Document;

@Schema()
export class Session {
  // @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  description: string;

  @Prop()
  start: string;

  @Prop()
  end: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  // @Type(() => User)
  // trainer: User;

  @Prop({ type: mongoose.Schema.Types.String })
  @Type(() => String)
  trainerId: string;

  // @Prop({
  //   type: { type: mongoose.Schema.Types.ObjectId, ref: Client.name },
  // })
  // @Type(() => Client)
  // client: Client;
  // @Prop({ type: mongoose.Schema.Types.String })
  // @Type(() => String)
  // clientId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
