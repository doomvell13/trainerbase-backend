import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
// import { Address, AddressSchema } from './address.schema';
import { User, UserSchema } from '../users/user.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  _id: ObjectId;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  fullName: string;

  // @Prop()
  // @Exclude()
  // password: string;

  @Prop({ enum: ['TRAINER', 'CLIENT'] })
  role: string;

  // @Prop({ type: AddressSchema })
  // @Type(() => Address)
  // address: Address;

  @Prop({ type: mongoose.Schema.Types.String })
  @Type(() => String)
  trainerId: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

ClientSchema.virtual('fullName').get(function (this: Client) {
  return `${this.firstName} ${this.lastName}`;
});

ClientSchema.virtual('clients', {
  ref: 'User',
  localField: 'fullName',
  foreignField: 'clients',
});
