import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Client } from '../clients/client.schema';
import { Transform, Type } from 'class-transformer';
import { Category } from '../categories/category.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  trainer: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Client.name }],
  })
  @Type(() => Client)
  client: Client;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
