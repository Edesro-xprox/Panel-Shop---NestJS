import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
    _id: Types.ObjectId;

    @Prop()
    user: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);