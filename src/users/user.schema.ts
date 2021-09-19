import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Address, AddressSchema } from './address.schema';
import { Session } from '../sessions/session.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  _id: ObjectId;

  @Prop({ unique: true })
  @Expose()
  email: string;

  @Prop()
  @Expose()
  firstName: string;

  @Prop()
  @Expose()
  lastName: string;
  @Expose()
  fullName: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ enum: ['TRAINER', 'CLIENT'] })
  @Expose()
  role: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

  @Type(() => Session)
  posts: Session[];

  @Expose()
  token?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'trainer',
});

export { UserSchema };
