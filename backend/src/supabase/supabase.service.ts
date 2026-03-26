import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private client: SupabaseClient;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_KEY');

        if (!url || !key) {
            console.warn('SUPABASE_URL or SUPABASE_KEY not found in .env. Some features may not work.');
            return;
        }

        this.client = createClient(url, key);
        console.log('Supabase client initialized successfully.');
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}
