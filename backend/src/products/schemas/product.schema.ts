import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @ApiProperty({ example: 'Jabón de Lavanda' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ example: 'Jabón artesanal relajante' })
    @Prop()
    description: string;

    @ApiProperty({ example: 12.5 })
    @Prop({ required: true })
    price: number;

    @ApiProperty({ example: '/images/lavender.jpg' })
    @Prop()
    image: string;

    @ApiProperty({ example: 'Jabones' })
    @Prop({ required: true })
    category: string;

    @ApiProperty({ example: 50 })
    @Prop({ default: 0 })
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
