import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts, type Product } from '../services/product.service';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const categories = [
    {
        id: 'velas',
        name: 'Velas de Soja',
        image: '/images/cat-candles.jpg', // Dark Candle Close-up (Reliable)
        filter: 'velas',
        description: 'Luz natural y aromas sagrados'
    },
    {
        id: 'sahumerios',
        name: 'Sahumerios',
        image: '/images/cat-incense.jpg', // Incense stick & smoke (Reliable)
        filter: 'sahumerios',
        description: 'Limpieza y elevación energética'
    },
    {
        id: 'jabones',
        name: 'Jabones Naturales',
        image: '/images/cat-soaps.jpg', // Soap Stack (Reliable)
        filter: 'jabones',
        description: 'Pureza botánica para tu piel'
    },
    {
        id: 'oleos',
        name: 'Bálsamos & Óleos',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200',
        filter: 'cremas',
        description: 'Nutrición botánica y elixires del desierto'
    }
];

const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(p => {
            const cat = p.category?.toLowerCase() || '';
            const filter = selectedCategory.toLowerCase();

            // Smart mapping for our new fancy categories
            if (filter === 'corporal') return cat.includes('jabon') || cat.includes('corporal') || cat.includes('cuerpo');
            if (filter === 'facial') return cat.includes('facial') || cat.includes('rostro') || cat.includes('serum') || cat.includes('crema');
            if (filter === 'aroma') return cat.includes('sahumerio') || cat.includes('aroma') || cat.includes('vela');
            if (filter === 'kits') return cat.includes('kit') || cat.includes('regalo');

            return cat.includes(filter);
        })
        : products;

    if (loading) {
        return (
            <div className="py-24 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-desert-accent mx-auto"></div>
                <p className="mt-4 font-cinzel text-desert-primary tracking-widest uppercase text-sm">Cargando Colección...</p>
            </div>
        );
    }

    return (
        <section id="productos" className="py-16 md:py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-desert-secondary font-montserrat tracking-[0.2em] uppercase text-xs mb-3 italic font-bold">
                        Arte & Naturaleza
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-cinzel text-desert-primary border-b border-desert-accent inline-block pb-4 tracking-widest font-bold">
                        {selectedCategory ? selectedCategory : 'Colección Exclusiva'}
                    </h3>
                </div>

                <AnimatePresence mode="wait">
                    {!selectedCategory ? (
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-6"
                        >
                            {categories.map((category, _) => (
                                <div
                                    key={category.id}
                                    className="group cursor-pointer relative h-96 overflow-hidden rounded-sm shadow-md transition-all duration-300 hover:shadow-xl"
                                    onClick={() => setSelectedCategory(category.filter)}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-8 z-20 text-center bg-gradient-to-t from-black/80 to-transparent">
                                        <Sparkles className="w-6 h-6 text-desert-accent mx-auto mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <h3 className="text-white font-cinzel text-xl md:text-2xl font-bold tracking-wider mb-2 drop-shadow-md">
                                            {category.name}
                                        </h3>
                                        <p className="text-white/80 font-montserrat text-xs italic mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {category.description}
                                        </p>
                                        <p className="text-white font-montserrat text-xs tracking-[0.2em] uppercase border-b border-desert-accent pb-1 inline-block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            Descubrir
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="mb-8 flex items-center gap-2 text-desert-primary font-montserrat hover:text-desert-accent transition-colors uppercase text-xs font-bold tracking-widest group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver a Categorías
                            </button>

                            <div className="grid grid-cols-1 xs:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 md:gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id || product.id} product={product as any} />
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-sm">
                                    <p className="text-desert-text font-montserrat">No hay productos en esta categoría por el momento.</p>
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className="mt-4 text-desert-primary font-bold underline cursor-pointer"
                                    >
                                        Ver otras categorías
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProductGrid;
