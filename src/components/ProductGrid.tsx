import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts, type Product } from '../services/product.service';
import { products as fallbackProducts } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const categories = [
    {
        id: 'velas',
        name: 'Velas de Soja',
        image: '/images/cat-candles.jpg', 
        filter: 'velas',
        description: 'Luz natural y aromas sagrados para tus espacios'
    },
    {
        id: 'sahumerios',
        name: 'Sahumerios',
        image: '/images/cat-incense.jpg', 
        filter: 'sahumerios',
        description: 'Limpieza, elevación y armonía energética'
    },
    {
        id: 'alquimia',
        name: 'Alquimia Sagrada',
        image: '/images/cat-alchemy.png', 
        filter: 'alquimia',
        description: 'Pociones y elixires para el alma'
    },
    {
        id: 'cristales',
        name: 'Cristales & Piedras',
        image: '/images/cat-crystals.png', 
        filter: 'cristales',
        description: 'Tesoros de la tierra con propósitos curativos'
    },
    {
        id: 'esencias',
        name: 'Esencias Puras',
        image: '/images/cat-essences.png', 
        filter: 'esencias',
        description: 'Concentrados botánicos para rituales profundos'
    },
    {
        id: 'corporal',
        name: 'Cosmética Natural',
        image: '/images/cat-creams.jpg',
        filter: 'cremas',
        description: 'Nutrición botánica y cuidado consciente'
    }
];

const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiData = await getProducts();
                // Si el API devuelve pocos productos o data vieja, mezclamos con el fallback local
                // Usamos un Map para evitar duplicados por nombre
                const allProductsMap = new Map();
                
                // Primero el fallback (asegura que las nuevas categorías tengan algo)
                fallbackProducts.forEach(p => allProductsMap.set(p.name, p));
                
                // Luego el API (sobrescribe si hay coincidencia de nombre)
                if (apiData && apiData.length > 0) {
                    apiData.forEach(p => allProductsMap.set(p.name, p));
                }
                
                setProducts(Array.from(allProductsMap.values()));
            } catch (error) {
                console.error('Error fetching products, using fallback:', error);
                setProducts(fallbackProducts as any);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        // Enforce category filter first
        const categoryMatch = !selectedCategory || (p.category?.toLowerCase() || '').includes(selectedCategory.toLowerCase());
        
        // Then text search
        const query = searchQuery.toLowerCase();
        const searchMatch = !searchQuery || 
            (p.name?.toLowerCase() || '').includes(query) || 
            (p.description?.toLowerCase() || '').includes(query) ||
            (p.category?.toLowerCase() || '').includes(query);

        return categoryMatch && searchMatch;
    });

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
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-desert-secondary font-montserrat tracking-[0.2em] uppercase text-xs mb-3 italic font-bold">
                        Arte & Naturaleza
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-cinzel text-desert-primary border-b border-desert-accent inline-block pb-4 tracking-widest font-bold">
                        {selectedCategory ? (selectedCategory === 'all' ? 'Colección Completa' : selectedCategory) : 'Colección Exclusiva'}
                    </h3>
                </div>

                {/* Mystic Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative group">
                    <div className="absolute inset-0 bg-desert-accent/5 blur-xl group-hover:bg-desert-accent/10 transition-all duration-700 rounded-full" />
                    <div className="relative flex items-center bg-white/5 backdrop-blur-md border border-desert-accent/20 rounded-sm p-1 shadow-inner group-focus-within:border-desert-accent/50 transition-all duration-500">
                        <div className="pl-4 text-desert-accent opacity-60">
                            <Sparkles size={20} />
                        </div>
                        <input 
                            type="text"
                            placeholder="Buscar en la alquimia... (ej: Lavanda, Vela, Ritual)"
                            className="bg-transparent border-none focus:ring-0 text-parchment placeholder:text-parchment/30 font-montserrat w-full py-4 px-4 text-sm tracking-widest"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="pr-4 text-desert-accent/40 hover:text-desert-accent transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    {/* Decorative running light border snippet */}
                    <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-desert-accent/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-1000" />
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
