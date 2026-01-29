import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @ApiProperty({ example: 'admin@naturalmystic.com' })
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @ApiProperty({ example: 'admin' })
    @Prop({ default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
