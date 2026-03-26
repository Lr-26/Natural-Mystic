import { ApiProperty } from '@nestjs/swagger';

export class Product {
    @ApiProperty({ example: 'Jabón de Lavanda' })
    name: string;

    @ApiProperty({ example: 'Jabón artesanal relajante' })
    description: string;

    @ApiProperty({ example: 12.5 })
    price: number;

    @ApiProperty({ example: '/images/lavender.jpg' })
    image: string;

    @ApiProperty({ example: 'Jabones' })
    category: string;

    @ApiProperty({ example: 50 })
    stock: number;
}

