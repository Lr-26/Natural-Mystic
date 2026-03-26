import { Injectable } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class OrdersService {
    constructor(private supabaseService: SupabaseService) { }

    async create(orderData: any): Promise<any> {
        const orderNumber = this.generateOrderNumber();
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .insert([{
                ...orderData,
                order_number: orderNumber,
                status: 'pending',
                payment_status: 'pending',
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }

        return data;
    }

    async findAll(): Promise<any[]> {
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return [];
        return data;
    }

    async findByUserId(userId: string): Promise<any[]> {
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) return [];
        return data;
    }

    async findById(id: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    }

    async updateStatus(id: string, status: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return data;
    }

    async updatePaymentStatus(id: string, paymentStatus: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('orders')
            .update({ payment_status: paymentStatus })
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return data;
    }

    private generateOrderNumber(): string {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `NM-${timestamp}-${random}`;
    }
}

