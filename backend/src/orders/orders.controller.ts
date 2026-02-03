import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear nuevo pedido' })
    @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
    async create(@Body() orderData: any) {
        return this.ordersService.create(orderData);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar todos los pedidos (solo admin)' })
    @ApiResponse({ status: 200, description: 'Lista de pedidos' })
    async findAll() {
        return this.ordersService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener pedidos de un usuario' })
    @ApiResponse({ status: 200, description: 'Pedidos del usuario' })
    async findByUser(@Param('userId') userId: string) {
        return this.ordersService.findByUserId(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalles de un pedido' })
    @ApiResponse({ status: 200, description: 'Detalles del pedido' })
    async findOne(@Param('id') id: string) {
        return this.ordersService.findById(id);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar estado del pedido (solo admin)' })
    @ApiResponse({ status: 200, description: 'Estado actualizado' })
    async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.ordersService.updateStatus(id, body.status);
    }

    @Patch(':id/payment-status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar estado de pago (solo admin)' })
    @ApiResponse({ status: 200, description: 'Estado de pago actualizado' })
    async updatePaymentStatus(@Param('id') id: string, @Body() body: { paymentStatus: string }) {
        return this.ordersService.updatePaymentStatus(id, body.paymentStatus);
    }
}
