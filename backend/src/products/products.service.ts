import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductsService {
    constructor(private supabaseService: SupabaseService) { }

    async findAll(): Promise<Product[]> {
        const { data, error } = await this.supabaseService.getClient()
            .from('Proyecto-Rubi')
            .select('*');

        if (error) {
            console.error('Error fetching products from Supabase:', error);
            // Si hay error (ej: tabla no existe), devolvemos el fallback inicial para que no se rompa la web
            return this.getFallbackProducts();
        }

        return data as Product[];
    }

    async findOne(id: string): Promise<Product> {
        const { data, error } = await this.supabaseService.getClient()
            .from('Proyecto-Rubi')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return data as Product;
    }

    async create(createProductDto: any): Promise<Product> {
        const { data, error } = await this.supabaseService.getClient()
            .from('Proyecto-Rubi')
            .insert([createProductDto])
            .select()
            .single();

        if (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
        return data as Product;
    }

    async update(id: string, updateProductDto: any): Promise<Product> {
        const { data, error } = await this.supabaseService.getClient()
            .from('Proyecto-Rubi')
            .update(updateProductDto)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new NotFoundException(`Product with ID ${id} not found or error during update`);
        }
        return data as Product;
    }

    async delete(id: string): Promise<any> {
        const { error } = await this.supabaseService.getClient()
            .from('Proyecto-Rubi')
            .delete()
            .eq('id', id);

        if (error) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return { message: 'Product deleted successfully' };
    }

    private getFallbackProducts(): Product[] {
        return [
            {
                name: 'Poción de Claridad',
                description: 'Una esencia alquímica para despejar la mente y enfocar el espíritu, destilada bajo la luz de la luna.',
                price: 4500,
                image: 'https://images.unsplash.com/photo-1584017945517-b97a736996e1?auto=format&fit=crop&q=80&w=800',
                category: 'Alquimia',
                stock: 15
            },
            {
                name: 'Aceite Luna Nueva',
                description: 'Extractos botánicos puros para rituales de renovación y nuevos comienzos.',
                price: 3200,
                image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
                category: 'Esencias',
                stock: 20
            },
            {
                name: 'Vela de Soja "Serenidad"',
                description: 'Vela artesanal de soja con aroma a lavanda y vainilla, decorada con flores secas.',
                price: 2800,
                image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
                category: 'Velas',
                stock: 25
            },
            {
                name: 'Sahumerio Sagrado Copal',
                description: 'Varillas de resina de copal natural, ideales para limpieza de ambientes y meditación profunda.',
                price: 1500,
                image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800',
                category: 'Sahumerios',
                stock: 50
            },
            {
                name: 'Palo Santo Energético',
                description: 'Madera de Palo Santo recolectada de forma sostenible para purificación espiritual.',
                price: 1200,
                image: 'https://images.unsplash.com/photo-1602848598418-45e039433290?auto=format&fit=crop&q=80&w=800',
                category: 'Sahumerios',
                stock: 100
            },
            {
                name: 'Bálsamo Alquímico Corporal',
                description: 'Tratamiento intensivo con manteca de karité y aceites esenciales para una piel luminosa.',
                price: 5200,
                image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
                category: 'Cremas',
                stock: 12
            },
            {
                name: 'Amatista de Sanación',
                description: 'Drusa de amatista natural de alta calidad para transmutación de energías negativas.',
                price: 6500,
                image: 'https://images.unsplash.com/photo-1567606117528-5febf1be742a?auto=format&fit=crop&q=80&w=800',
                category: 'Cristales',
                stock: 8
            },
            {
                name: 'Vela "Llama del Desierto"',
                description: 'Vela aromática con notas de sándalo y especias, evocando la calidez del desierto místico.',
                price: 3100,
                image: 'https://images.unsplash.com/photo-1572715655204-47e297d3b050?auto=format&fit=crop&q=80&w=800',
                category: 'Velas',
                stock: 18
            }
        ];
    }
}

