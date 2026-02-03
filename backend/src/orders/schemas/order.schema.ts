import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type OrderDocument = Order & Document;

class OrderItem {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    image: string;
}

class ShippingAddress {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    province: string;

    @ApiProperty()
    postalCode: string;
}

@Schema({ timestamps: true })
export class Order {
    @ApiProperty()
    @Prop({ required: true })
    orderNumber: string;

    @ApiProperty()
    @Prop({ type: [OrderItem], required: true })
    items: OrderItem[];

    @ApiProperty()
    @Prop({ required: true })
    total: number;

    @ApiProperty()
    @Prop({ type: ShippingAddress, required: true })
    shippingAddress: ShippingAddress;

    @ApiProperty()
    @Prop({ required: true })
    email: string;

    @ApiProperty()
    @Prop({ required: true, enum: ['card', 'transfer', 'cash', 'mercadopago'] })
    paymentMethod: string;

    @ApiProperty()
    @Prop({ default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
    status: string;

    @ApiProperty()
    @Prop({ default: 'pending', enum: ['pending', 'paid', 'failed'] })
    paymentStatus: string;

    @ApiProperty()
    @Prop()
    userId?: string;

    @ApiProperty()
    @Prop()
    notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
