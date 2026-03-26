import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
    constructor(private supabaseService: SupabaseService) {
        // Initialize admin if doesn't exists (check Supabase)
        this.initializeAdminIfNeeded();
    }

    private async initializeAdminIfNeeded() {
        const client = this.supabaseService.getClient();
        if (!client) {
            console.warn('Supabase client not initialized. Skipping admin check.');
            return;
        }

        const adminEmail = 'admin@naturalmystic.com';
        const { data: existingAdmin, error: checkError } = await client
            .from('users')
            .select('*')
            .eq('email', adminEmail)
            .single();

        if (checkError || !existingAdmin) {
            console.log('Admin user not found, initializing...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await client
                .from('users')
                .insert([{
                    email: adminEmail,
                    password: hashedPassword, // Store securely
                    name: 'Natural Mystic Admin',
                    role: 'admin'
                }]);
        }
    }

    async create(email: string, password: string, extraData: any = {}): Promise<any> {
        const { data: existingUser, error: checkError } = await this.supabaseService.getClient()
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { data: newUser, error: insertError } = await this.supabaseService.getClient()
            .from('users')
            .insert([{
                email,
                password: hashedPassword,
                role: 'user',
                name: email.split('@')[0],
                ...extraData // Any professional comments or extra metadata
            }])
            .select()
            .single();

        if (insertError) {
            throw new Error(`Error al registrar usuario: ${insertError.message}`);
        }

        return newUser;
    }

    async findOneByEmail(email: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) return null;
        return data;
    }

    async findAll(): Promise<any[]> {
        const { data, error } = await this.supabaseService.getClient()
            .from('users')
            .select('*');

        if (error) return [];
        return data;
    }

    async findById(id: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    }

    async updateRole(id: string, role: string): Promise<any | null> {
        const { data, error } = await this.supabaseService.getClient()
            .from('users')
            .update({ role })
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return data;
    }

    async deleteUser(id: string): Promise<any | null> {
        const { data: deleted, error } = await this.supabaseService.getClient()
            .from('users')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return deleted;
    }
}

