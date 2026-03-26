import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('mercadopago/preference')
    async createPreference(@Body() data: { items: any[], orderId: string }) {
        return this.paymentsService.createPreference(data.items, data.orderId);
    }

    @Post('polar/checkout')
    async createPolarCheckout(@Body() data: { total: number, orderId: string }) {
        return this.paymentsService.createPolarCheckout(data.total, data.orderId);
    }
}


