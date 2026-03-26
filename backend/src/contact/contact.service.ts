import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ContactService {
    constructor(private supabaseService: SupabaseService) { }

    async saveMessage(messageData: any) {
        const { data, error } = await this.supabaseService.getClient()
            .from('messages')
            .insert([{
                name: `${messageData.name} ${messageData.lastName}`,
                email: messageData.email,
                phone: messageData.phone,
                subject: messageData.subject,
                message: messageData.message,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error saving contact message:', error);
            throw new Error('No se pudo guardar el mensaje');
        }

        return data;
    }

    async findAll() {
        const { data, error } = await this.supabaseService.getClient()
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return [];
        return data;
    }
}
