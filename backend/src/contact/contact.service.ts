import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContactService {
    constructor(
        private supabaseService: SupabaseService,
        private mailService: MailService,
    ) { }

    async saveMessage(messageData: any) {
        // 1. Guardar en la tabla 'messages'
        const { data: message, error: messageError } = await this.supabaseService.getClient()
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

        if (messageError) {
            console.error('Error saving contact message:', messageError);
            throw new Error('No se pudo guardar el mensaje');
        }

        // 2. Guardar o actualizar en la tabla 'contacts' (La Tribu)
        await this.supabaseService.getClient()
            .from('contacts')
            .upsert({
                email: messageData.email,
                name: `${messageData.name} ${messageData.lastName}`,
                phone: messageData.phone,
                last_contact: new Date().toISOString()
            }, { onConflict: 'email' });

        // 3. Enviar notificación por correo usando el servicio global
        this.mailService.sendContactNotification(messageData);

        return message;
    }

    async findAll() {
        const { data, error } = await this.supabaseService.getClient()
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return [];
        return data;
    }

    async findAllContacts() {
        const { data, error } = await this.supabaseService.getClient()
            .from('contacts')
            .select('*')
            .order('last_contact', { ascending: false });

        if (error) return [];
        return data;
    }
}
