import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
// import { Address, AddressSchema } from './address.schema';
import { User, UserSchema } from '../users/user.schema';
export type ClientDocument = Client & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Client {
  _id: ObjectId;

  @Prop({ unique: true })
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

  @Prop({ type: UserSchema })
  @Type(() => User)
  trainerId: User;
}

const ClientSchema = SchemaFactory.createForClass(Client);

ClientSchema.virtual('fullName').get(function (this: Client) {
  return `${this.firstName} ${this.lastName}`;
});

export { ClientSchema };
