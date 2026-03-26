import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ example: 'admin@naturalmystic.com' })
    email: string;

    password: string;

    @ApiProperty({ example: 'admin' })
    role: string;
}

