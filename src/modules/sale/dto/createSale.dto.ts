import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateSaleDto {
    @IsNotEmpty()
    clientId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    sessionId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    userId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    total: number;
}
