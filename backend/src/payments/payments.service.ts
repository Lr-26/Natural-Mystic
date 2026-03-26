import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Polar } from '@polar-sh/sdk';

@Injectable()
export class PaymentsService {
    private client: MercadoPagoConfig;
    private polar: Polar;

    constructor(private configService: ConfigService) {
        const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');
        this.client = new MercadoPagoConfig({ accessToken: accessToken || 'TEST-TOKEN' });

        const polarToken = this.configService.get<string>('POLAR_ACCESS_TOKEN');
        this.polar = new Polar({ accessToken: polarToken || 'TEST-TOKEN' });
    }

    async createPreference(items: any[], orderId: string) {
        try {
            const preference = new Preference(this.client);
            
            const result = await preference.create({
                body: {
                    items: items.map(item => ({
                        id: item.productId,
                        title: item.name,
                        unit_price: Number(item.price),
                        quantity: Number(item.quantity),
                        currency_id: 'ARS',
                    })),
                    back_urls: {
                        success: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5174'}/pago-confirmado`,
                        failure: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5174'}/checkout`,
                        pending: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5174'}/checkout`,
                    },
                    auto_return: 'approved',
                    external_reference: orderId,
                }
            });

            return {
                id: result.id,
                init_point: result.init_point,
            };
        } catch (error) {
            console.error('Error creating Mercado Pago preference:', error);
            throw new InternalServerErrorException('Error al crear la preferencia de pago');
        }
    }

    async createPolarCheckout(total: number, orderId: string) {
        try {
            // Polar usually works with pre-defined products or custom checkouts
            // For this implementation, we assume the user has a generic 'Order' product in Polar
            const result = await this.polar.checkouts.create({
                products: [this.configService.get<string>('POLAR_PRODUCT_ID') || 'DEFAULT-PRODUCT-ID'],
                successUrl: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5174'}/pago-confirmado?orderId=${orderId}`,
                customerEmail: 'customer@example.com', 
                metadata: {
                    orderId: orderId,
                }
            });

            return {
                id: result.id,
                url: result.url,
            };
        } catch (error) {
            console.error('Error creating Polar checkout:', error);
            throw new InternalServerErrorException('Error al crear el checkout de Polar');
        }
    }
}


