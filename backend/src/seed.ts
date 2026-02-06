import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    const mysticProducts = [
        // 1. VELAS DE SOJA (Soy Candles)
        {
            name: 'Vela de Soja "Luna Nueva"',
            description: 'Vela alquímica de cera de soja pura con aceite esencial de lavanda orgánica y cristales de amatista. Ideal para meditación y calma.',
            price: 22.00,
            category: 'Velas',
            image: '/images/cat-candles.jpg', // Candle/Dark light
            stock: 30,
        },
        {
            name: 'Vela de Soja "Bosque Encantado"',
            description: 'Aroma profundo a pino, musgo y tierra húmeda. Cera de soja 100% natural libre de parafinas.',
            price: 24.00,
            category: 'Velas',
            image: '/images/cat-candles.jpg', // Dark green/nature
            stock: 25,
        },

        // 2. SAHUMERIOS (Incense)
        {
            name: 'Sahumerio de Palo Santo',
            description: 'Madera sagrada recolectada sustentablemente en Perú. Limpia la energía densa y eleva la vibración del hogar.',
            price: 12.00,
            category: 'Sahumerios',
            image: '/images/cat-incense.jpg', // Wood incense
            stock: 100,
        },
        {
            name: 'Atado de Salvia Blanca',
            description: 'Sahumo ancestral de salvia blanca californiana. Purificación profunda de espacios y aura.',
            price: 18.00,
            category: 'Sahumerios',
            image: '/images/cat-incense.jpg', // Smudge
            stock: 50,
        },

        // 3. JABÓN NATURAL (Natural Soaps)
        {
            name: 'Jabón Natural de Avena & Miel',
            description: 'Jabón saponificado en frío con leche de avena y miel orgánica. Suavidad extrema para pieles sensibles.',
            price: 10.50,
            category: 'Jabones',
            image: '/images/cat-soaps.jpg', // Oats/Honey vibe
            stock: 40,
        },
        {
            name: 'Jabón de Rosas Silvestres',
            description: 'Hecho con aceite de rosa mosqueta y pétalos reales. Propiedades regeneradoras y aroma embriagador.',
            price: 12.00,
            category: 'Jabones',
            image: '/images/cat-soaps.jpg', // Rose soap
            stock: 35,
        },

        // 4. CREMAS NATURALES (Natural Creams/Cosmetics)
        {
            name: 'Crema Nutritiva "Diosa Solar"',
            description: 'Crema facial rica en caléndula y manteca de karité. Hidratación profunda y brillo natural.',
            price: 28.00,
            category: 'Cremas',
            image: '/images/cat-creams.jpg', // Cream jar
            stock: 20,
        },
        {
            name: 'Serum Facial "Elixir Nocturno"',
            description: 'Concentrado de aceites botánicos con bakuchiol y lavanda. Reparación intensiva mientras duermes.',
            price: 35.00,
            category: 'Cremas',
            image: '/images/cat-creams.jpg', // Dropper/Serum
            stock: 15,
        },
    ];

    console.log('🌱 Seeding database with AUTHENTIC MYSTIC NATURAL products...');

    for (const product of mysticProducts) {
        try {
            await productsService.create(product as any);
            console.log(`✨ Created: ${product.name}`);
        } catch (e: any) {
            console.log(`⚠️ Note: ${product.name} might already exist or error: ${e.message}`);
        }
    }

    console.log('✅ Seeding complete!');
    await app.close();
}

bootstrap();
