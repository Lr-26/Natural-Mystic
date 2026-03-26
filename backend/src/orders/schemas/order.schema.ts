import { ApiProperty } from '@nestjs/swagger';

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

export class Order {
    @ApiProperty()
    orderNumber: string;

    @ApiProperty()
    items: OrderItem[];

    @ApiProperty()
    total: number;

    @ApiProperty()
    shippingAddress: ShippingAddress;

    @ApiProperty()
    email: string;

    @ApiProperty()
    paymentMethod: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    paymentStatus: string;

    @ApiProperty()
    userId?: string;

    @ApiProperty()
    notes?: string;
}

